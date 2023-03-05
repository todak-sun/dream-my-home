import axios from "axios";
import chalk from "chalk";
import { ComplexArticleParam, SingleMarkerV2Params } from "src/interfaces/request";
import { RegionResponse, SingleMarkerV2Response } from "src/interfaces/response";
import { ComplexArticleResponse, ComplexOverview, ComplexResponse } from "../interfaces/response/index";

export function waitSecond(second: number) {
  return new Promise((res) => setTimeout(res, 1000 * second));
}

function paramSerializer2(params: Record<string, any>) {
  return Object.entries(params)
    .reduce((acc, [key, value]) => {
      if (Array.isArray(value)) {
        acc.push(`${key}=${value.join(":")}`);
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
        acc.push(`${encodeURIComponent(key)}=${encodeURIComponent(value.join(": "))}`);
      } else if (value === null || value === undefined) {
        acc.push(`${key}`);
      } else {
        acc.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      }
      return acc;
    }, [] as string[])
    .join("&");
}

const api = axios.create({
  baseURL: `https://new.land.naver.com/api`,
  paramsSerializer: {
    serialize: paramSerializer,
  },
});

api.interceptors.request.use((req) => {
  const method = req.method?.toUpperCase() || "UNKNOWN";
  const url = req.url;
  const qs = paramSerializer2(req.params);
  console.log(chalk.green(`[${method}] ${url}?${qs}`));
  console.log(chalk.red(JSON.stringify(req.headers)));
  return req;
});

async function fetchRegionList(param: { cortarNo: string }) {
  const { data } = await api.get<RegionResponse>(`/regions/list`, {
    params: {
      ...param,
    },
  });
  return data;
}

async function fetchComplexesByCortarNo(param: { cortarNo: string }) {
  const { data } = await api.get<ComplexResponse>(`/regions/complexes`, {
    params: {
      ...param,
      realEstateType: "APT",
      order: null,
    },
  });
  return data;
}

async function fetchComplexOverview(param: { complexNo: string }) {
  const { data } = await api.get<ComplexOverview>(`/complexes/overview/${param.complexNo}`, {
    params: {
      complexNo: param.complexNo,
      isClickedMarker: true,
    },
  });
  return data;
}

async function fetchSingleMarkers(param: SingleMarkerV2Params) {
  const { data } = await api.get<SingleMarkerV2Response[]>(`/complexes/single-markers/2.0`, {
    params: {
      ...param,
    },
  });
  return data;
}

async function fetchComplexArticles(param: ComplexArticleParam, headers: Record<string, string>) {
  const { data } = await api.get<ComplexArticleResponse>(`/articles/complex/${param.complexNo}`, {
    params: { ...param },
    headers: headers,
  });
  return data;
}

export const myContext = {
  fetchRegionList,
  waitSecond,
  fetchSingleMarkers,
  fetchComplexesByCortarNo,
  fetchComplexOverview,
  fetchComplexArticles,
  generateKey: (param: { name: string; lon: number; lat: number }) => {
    const { name, lon, lat } = param;
    return `${name}|${lon}|${lat}`;
  },
};

export type MyContext = typeof myContext;
