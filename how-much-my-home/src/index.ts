import * as fs from "fs/promises";
import * as path from "path";
import puppeteer, { HTTPResponse } from "puppeteer";
import { NaverLandMarker } from "./interfaces/response";
import { waitSecond } from "./utils/index";

async function loadDataDir(): Promise<string> {
  const DATA_DIR = path.resolve(
    "d:/workspace/github/dream-my-home/how-much-my-home",
    "data"
  );
  try {
    await fs.readdir(DATA_DIR);
  } catch (e) {
    await fs.mkdir(DATA_DIR);
  }
  return DATA_DIR;
}

async function main() {
  const dataDir = await loadDataDir();
  const markerMap: Record<string, NaverLandMarker> = {};
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1280,
      height: 1024,
    },
  });

  const page = await browser.newPage();
  page.on(`response`, async (res: HTTPResponse) => {
    const req = res.request();
    const requestUrl = req.url();
    if (
      requestUrl.includes(
        `https://new.land.naver.com/api/complexes/single-markers/2.0`
      )
    ) {
      const data: NaverLandMarker[] = await res.json();
      data.forEach((item) => {
        markerMap[item.markerId] = item;
      });
    }
  });

  await page.goto("https://new.land.naver.com");
  await waitSecond(30);
  await fs.writeFile(
    path.resolve(dataDir, "data.json"),
    JSON.stringify(Object.values(markerMap)),
    { encoding: "utf-8" }
  );
  await browser.close();
}

main();
