export type NaverLandParams = {
  ms: [number, number, number];
  a: "APT"; // 아파트.
  b: "A1"; // 매매 유형
  e: "RETAIL";
  g: number; // 최대 가격
  h: number; // 최소 면적
  i: number; // 최대 면적
  j: 20; // 연식
  l: 300; // 세대수
};

export type PriceType = "RETAIL" | "REAL";

export type SingleMarkerV2Params = {
  cortarNo: string;
  zoom: 16;
  priceType: PriceType;
  markerId: null;
  markerType: null;
  selectedComplexNo: null;
  selectedComplexBuildingNo: null;
  fakeComplexMarker: null;
  realEstateType: "APT";
  tradeType: "A1";
  tag: "::::::::";
  rentPriceMin: 0;
  rentPriceMax: 900000000;
  priceMin: number;
  priceMax: number;
  areaMin: number;
  areaMax: number;
  oldBuildYears: number | null;
  recentlyBuildYears: null;
  minHouseHoldCount: number | null;
  maxHouseHoldCount: number | null;
  showArticle: boolean;
  sameAddressGroup: boolean;
  minMaintenanceCost: null;
  maxMaintenanceCost: null;
  directions: null;
  leftLon: number;
  rightLon: number;
  topLat: number;
  bottomLat: number;
};

export type ComplexArticleParam = {
  realEstateType: "APT:ABYG:JGC";
  tradeType: "A1";
  tag: "::::::::";
  rentPriceMin: number;
  rentPriceMax: number;
  priceMin: number;
  priceMax: number;
  areaMin: number;
  areaMax: number;
  oldBuildYears: number | null;
  recentlyBuildYears: null;
  minHouseHoldCount: null;
  maxHouseHoldCount: null;
  showArticle: boolean;
  sameAddressGroup: boolean;
  minMaintenanceCost: null;
  maxMaintenanceCost: null;
  priceType: PriceType;
  directions: null;
  page: number;
  complexNo: 22171;
  buildingNos: null;
  areaNos: "2:4:5:6:3";
  type: "list";
  order: "rank";
};
