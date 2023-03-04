import * as fs from "fs/promises";
import * as path from "path";
import puppeteer from "puppeteer";
import { CortarsDivision, CortarsSection } from "./constants/cortars";
import { MyComplexType } from "./interfaces/index";
import { ComplexDetail } from "./interfaces/response/index";
import {
  MyContext,
  myContext,
  waitSecond
} from "./utils/index";

async function loadDataDir(): Promise<string> {
  const DATA_DIR = path.resolve("d:/workspace/github/dream-my-home/how-much-my-home", "data");
  try {
    await fs.readdir(DATA_DIR);
  } catch (e) {
    await fs.mkdir(DATA_DIR);
  }
  return DATA_DIR;
}

async function main() {
  const dataDir = await loadDataDir();

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1280,
      height: 1024,
    },
    devtools: true,
  });

  const page = await browser.newPage();

  const context = {
    CortarsSection: CortarsSection,
    CortarsDivision: CortarsDivision,
  };
  await page.goto("https://new.land.naver.com");
  await waitSecond(2);

  for (const [key, value] of Object.entries(myContext)) {
    await page.exposeFunction(key, value);
  }

  const markerResults = await page.evaluate(async (context) => {
    const { CortarsDivision } = context;
    const win = window as unknown as Window & MyContext;
    const regionResponse = await win.fetchRegionList({ cortarNo: CortarsDivision.동대문구 });
    const complexMap: Map<string, ComplexDetail> = new Map();

    for (const region of regionResponse.regionList) {
      const res = await win.fetchComplexesByCortarNo({ cortarNo: region.cortarNo });
      for (const complex of res.complexList) {
        const key = await win.generateKey({
          name: complex.complexName,
          lon: complex.longitude,
          lat: complex.latitude,
        });
        complexMap.set(key, complex);
      }
    }

    const myComplexes: MyComplexType[] = [];
    for (const region of regionResponse.regionList) {
      await win.waitSecond(1);
      const res = await win.fetchSingleMarkers({
        cortarNo: region.cortarNo,
        zoom: 16,
        priceType: "RETAIL",
        markerId: null,
        markerType: null,
        selectedComplexNo: null,
        selectedComplexBuildingNo: null,
        fakeComplexMarker: null,
        realEstateType: "APT",
        tradeType: "A1",
        tag: "::::::::",
        rentPriceMin: 0,
        rentPriceMax: 900000000,
        priceMin: 0,
        priceMax: 70000,
        areaMin: 48,
        areaMax: 132,
        oldBuildYears: 20,
        recentlyBuildYears: null,
        minHouseHoldCount: 100,
        maxHouseHoldCount: 2000,
        showArticle: false,
        sameAddressGroup: true,
        minMaintenanceCost: null,
        maxMaintenanceCost: null,
        directions: null,
        leftLon: region.centerLon - 0.03,
        rightLon: region.centerLon + 0.03,
        topLat: region.centerLat + 0.01,
        bottomLat: region.centerLat - 0.01,
      });

      for (const marker of res) {
        const key = await win.generateKey({ name: marker.complexName, lon: marker.longitude, lat: marker.latitude });
        if (complexMap.has(key)) {
          await win.waitSecond(0.5);
          const complex = complexMap.get(key)!;
          myComplexes.push({
            ...marker,
            complexNo: complex.complexNo,
            cortarNo: complex.cortarNo,
            cortarAddress: complex.cortarAddress,
            detailAddress: complex.detailAddress,
            useApproveYmd: complex.useApproveYmd,
            overview: await win.fetchComplexOverview({ complexNo: complex.complexNo }),
          });
        }
      }
    }
    return myComplexes;
  }, context);

  await fs.writeFile(path.join(dataDir, "data.json"), JSON.stringify({ size: markerResults.length, data: markerResults }), {
    encoding: "utf-8",
  });
  await browser.close();
}

main();
