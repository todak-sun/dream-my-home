import { ComplexArticleParam, SingleMarkerV2Params } from "src/interfaces/request";
import { RegionResponse, SingleMarkerV2Response } from "src/interfaces/response";
import { ComplexResponse, ComplexOverview } from "../interfaces/response/index";

export function waitSecond(second: number) {
  return new Promise((res) => setTimeout(res, 1000 * second));
}

function paramSerializer2(params: Record<string, any>) {
  return Object.entries(params)
    .reduce((acc, [key, value]) => {
      if (Array.isArray(value)) {
        acc.push(`${key}=${value.join(",")}`);
      } else if (value === null || value === undefined) {
        acc.push(`${key}`);
      } else {
        acc.push(`${key}=${value}`);
      }
      return acc;
    }, [] as string[])
    .join("&");
}

function paramSerializer(params: Record<string, any>) {
  return Object.entries(params)
    .reduce((acc, [key, value]) => {
      if (Array.isArray(value)) {
        acc.push(`${encodeURIComponent(key)}=${value.map((v) => encodeURIComponent(v)).join(",")}`);
      } else if (value === null || value === undefined) {
        acc.push(`${key}`);
      } else {
        acc.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      }
      return acc;
    }, [] as string[])
    .join("&");
}

function fetchRegionList(param: { cortarNo: string }) {
  return fetch(`https://new.land.naver.com/api/regions/list?${paramSerializer(param)}`).then((res) =>
    res.json()
  ) as Promise<RegionResponse>;
}

function fetchComplexesByCortarNo(param: { cortarNo: string }) {
  return fetch(
    `https://new.land.naver.com/api/regions/complexes?${paramSerializer({
      ...param,
      realEstateType: "APT:ABYG:JGC",
      order: null,
    })}`
  ).then((res) => res.json()) as Promise<ComplexResponse>;
}

function fetchComplexOverview(param: { complexNo: string }) {
  console.log(
    `https://new.land.naver.com/api/complexes/overview/${param.complexNo}?${paramSerializer2({
      complexNo: param.complexNo,
      isClickedMarker: true,
    })}`
  );
  return fetch(
    `https://new.land.naver.com/api/complexes/overview/${param.complexNo}?${paramSerializer({
      complexNo: param.complexNo,
      isClickedMarker: true,
    })}`
  ).then((res) => res.json()) as Promise<ComplexOverview>;
}

function fetchSingleMarkers(param: SingleMarkerV2Params) {
  console.log(`https://new.land.naver.com/api/complexes/single-markers/2.0?${paramSerializer2(param)}`);
  return fetch(`https://new.land.naver.com/api/complexes/single-markers/2.0?${paramSerializer(param)}`).then((res) =>
    res.json()
  ) as Promise<SingleMarkerV2Response[]>;
}

function fetchComplexArticles(param: ComplexArticleParam) {
  return fetch(`https://new.land.naver.com/api/articles/complex/`)
}

export const myContext = {
  fetchRegionList,
  waitSecond,
  fetchSingleMarkers,
  fetchComplexesByCortarNo,
  fetchComplexOverview,
  generateKey: (param: { name: string; lon: number; lat: number }) => {
    const { name, lon, lat } = param;
    return `${name}|${lon}|${lat}`;
  },
};

export type MyContext = typeof myContext;
