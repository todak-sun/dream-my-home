import * as fs from "fs/promises";
import * as path from "path";
import puppeteer from "puppeteer";
import { CortarsDivision, CortarsSection, PRICE } from "./constants/cortars";
import { MyComplexType } from "./interfaces/index";
import { SingleMarkerV2Params } from "./interfaces/request/index";
import { ComplexDetail } from "./interfaces/response/index";
import { MyContext, myContext, waitSecond } from "./utils/index";

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
    PRICE: PRICE,
    headers: {} as Record<string, string>,
  };

  // const params: NaverLandParams = {
  //  a: "APT",
  //  b: "A1",
  //  e: "RETAIL" ,
  //  g: 70000,
  //  h: 49,
  //  j: 20,
  //  l: 100,
  //  m: 2000,
  // }
  const getHeader = new Promise<Record<string, string>>((resolve) => {
    page.on(`response`, function handle(res) {
      const req = res.request();
      if (req.url().includes(`/api/complexes/single-markers/2.0`)) {
        page.off(`response`, handle);
        resolve(req.headers());
      }
    });
  });
  await page.goto("https://new.land.naver.com");
  await waitSecond(2);
  const headers = await getHeader;
  context.headers = headers;
  for (const [key, value] of Object.entries(myContext)) {
    await page.exposeFunction(key, value);
  }

  const markerResults = await page.evaluate(async (context) => {
    const { CortarsDivision, PRICE, headers } = context;
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

    const myComplexMap: Map<string, MyComplexType> = new Map();
    for (const region of regionResponse.regionList) {
      await win.waitSecond(1);
      const singleMarkerParam: SingleMarkerV2Params = {
        cortarNo: region.cortarNo,
        zoom: 16,
        priceType: "RETAIL",
        markerId: null,
        markerType: null,
        selectedComplexNo: null,
        selectedComplexBuildingNo: null,
        fakeComplexMarker: null,
        realEstateType: ["APT"],
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
        sameAddressGroup: false,
        minMaintenanceCost: null,
        maxMaintenanceCost: null,
        directions: null,
        leftLon: region.centerLon - 0.03,
        rightLon: region.centerLon + 0.03,
        topLat: region.centerLat + 0.01,
        bottomLat: region.centerLat - 0.01,
      };

      const markers = await win.fetchSingleMarkers(singleMarkerParam);
      for (const marker of markers) {
        const key = await win.generateKey({ name: marker.complexName, lon: marker.longitude, lat: marker.latitude });
        await win.waitSecond(0.5);
        if (complexMap.has(key)) {
          const complex = complexMap.get(key)!;
          if (myComplexMap.has(complex.complexNo)) {
            continue;
          }
          const overview = await win.fetchComplexOverview({ complexNo: complex.complexNo });
          await win.waitSecond(0.5);
          const complexArticle = await win.fetchComplexArticles(
            {
              realEstateType: singleMarkerParam.realEstateType,
              tradeType: singleMarkerParam.tradeType,
              tag: singleMarkerParam.tag,
              rentPriceMin: PRICE.MIN,
              rentPriceMax: PRICE.MAX,
              priceMin: singleMarkerParam.priceMin,
              priceMax: singleMarkerParam.priceMax,
              areaMin: PRICE.MIN,
              areaMax: PRICE.MAX,
              oldBuildYears: singleMarkerParam.oldBuildYears,
              recentlyBuildYears: singleMarkerParam.recentlyBuildYears,
              minHouseHoldCount: singleMarkerParam.minHouseHoldCount,
              maxHouseHoldCount: singleMarkerParam.maxHouseHoldCount,
              showArticle: singleMarkerParam.showArticle,
              sameAddressGroup: singleMarkerParam.sameAddressGroup,
              minMaintenanceCost: null,
              maxMaintenanceCost: null,
              priceType: singleMarkerParam.priceType,
              directions: null,
              page: 1,
              complexNo: complex.complexNo,
              buildingNos: [],
              areaNos: overview.pyeongs.map((item) => item.pyeongNo),
              type: "list",
              order: "rank",
            },
            headers
          );

          await win.waitSecond(0.5);
          myComplexMap.set(complex.complexNo, {
            ...marker,
            complexNo: complex.complexNo,
            cortarNo: complex.cortarNo,
            cortarAddress: complex.cortarAddress,
            detailAddress: complex.detailAddress,
            useApproveYmd: complex.useApproveYmd,
            overview,
            articles: complexArticle.articleList,
          });
        }
      }
    }
    return [...myComplexMap.values()];
  }, context);

  await fs.writeFile(path.join(dataDir, "data.json"), JSON.stringify({ size: markerResults.length, data: markerResults }), {
    encoding: "utf-8",
  });
  await browser.close();
}

main();
