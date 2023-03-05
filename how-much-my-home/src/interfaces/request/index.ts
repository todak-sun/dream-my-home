export type NaverLandParams = {
  ms: [number, number, number];
  a: RealEstateType; // 아파트.
  b: TradeType; // 매매 유형
  e: PriceType;
  g: number; // 최대 가격
  h: number; // 최소 면적
  i: number; // 최대 면적
  j: 20; // 연식
  l: number; // 세대수 최소
  m: number; // 세대수 최대
};

export type PriceType = "RETAIL" | "REAL";
export type TradeType = "A1";

export type RealEstateType = "APT" //아파트
| "JGC" // 재건축
| "ABYG" // 분양권
;

export type SingleMarkerV2Params = {
  cortarNo: string;
  zoom: 16;
  priceType: PriceType;
  markerId: null;
  markerType: null;
  selectedComplexNo: null;
  selectedComplexBuildingNo: null;
  fakeComplexMarker: null;
  realEstateType: RealEstateType[];
  tradeType: TradeType;
  tag: "::::::::";
  rentPriceMin: number;
  rentPriceMax: number;
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
  realEstateType: RealEstateType[];
  tradeType: TradeType;
  tag: "::::::::";
  rentPriceMin: number;
  rentPriceMax: number;
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
  priceType: PriceType;
  directions: null;
  page: number;
  complexNo: string;
  buildingNos: string[];
  areaNos: number[];
  type: "list";
  order: "rank" | "prc";
};
