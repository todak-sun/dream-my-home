export type SingleMarkerV2Response = {
  markerId: string;
  markerType: string;
  latitude: number;
  longitude: number;
  complexName: string;
  realEstateTypeCode: string;
  realEstateTypeName: string;
  completionYearMonth: string;
  totalDongCount: number;
  totalHouseholdCount: number;
  floorAreaRatio: number;
  minDealUnitPrice: number;
  maxDealUnitPrice: number;
  minLeaseUnitPrice: number;
  maxLeaseUnitPrice: number;
  minLeaseRate: number;
  maxLeaseRate: number;
  minArea: string;
  maxArea: string;
  minDealPrice: number;
  maxDealPrice: number;
  minLeasePrice: number;
  maxLeasePrice: number;
  minRentPrice: number;
  maxRentPrice: number;
  minShortTermRentPrice: number;
  maxShortTermRentPrice: number;
  isDealShown: boolean;
  isLeaseShown: boolean;
  isRentShown: boolean;
  priceCount: number;
  representativeArea: number;
  medianDealUnitPrice: number;
  medianLeaseUnitPrice: number;
  medianLeaseRate: number;
  medianDealPrice: number;
  medianLeasePrice: number;
  medianRentPrice: number;
  representativePhoto: string;
  photoCount: number;
  dealCount: number;
  leaseCount: number;
  rentCount: number;
  shortTermRentCount: number;
  totalArticleCount: number;
  existPriceTab: boolean;
};

export type RegionDetail = {
  centerLat: number;
  centerLon: number;
  cortarName: string;
  cortarNo: string;
  cortarType: "dvsn" | "sec";
};

export type RegionResponse = {
  regionList: RegionDetail[];
};

export type ComplexDetail = {
  complexName: string;
  complexNo: string;
  cortarAddress: string;
  cortarNo: string;
  dealCount: number;
  detailAddress: string;
  highFloor: number;
  latitude: number;
  leaseCount: number;
  longitude: number;
  lowFloor: number;
  realEstateTypeCode: string;
  realEstateTypeName: string;
  rentCount: number;
  shortTermRentCount: number;
  totalBuildingCount: number;
  totalHouseholdCount: number;
  useApproveYmd: string;
};

export type ComplexResponse = {
  complexList: ComplexDetail[];
};

export type ComplexOverviewPyeong = {
  pyeongNo: number;
  supplyAreaDouble: number;
  supplyArea: string;
  pyeongName: string;
  pyeongName2: string;
  exclusiveArea: string;
  exclusivePyeong: string;
};

export type ComplexOverviewDong = { dongNo: string; bildName: string; highFloor: number; lowFloor: number; sortNo: string };

export type ComplexOverview = {
  complexTypeName: string;
  complexType: string;
  complexName: string;
  complexNo: string;
  totalHouseHoldCount: number;
  totalDongCount: number;
  useApproveYmd: string;
  minArea: number;
  maxArea: number;
  minPrice: number;
  maxPrice: number;
  minLeasePrice: number;
  maxLeasePrice: number;
  minPriceByLetter: string;
  maxPriceByLetter: string;
  minLeasePriceByLetter: string;
  maxLeasePriceByLetter: string;
  leasePerDealRate: number;
  isaleDealRestrictionCode: string;
  rebuildMembershipTransYn: string;
  livingResidenceYn: string;
  latitude: number;
  longitude: number;
  pyeongs: ComplexOverviewPyeong[];
  dongs: ComplexOverviewDong[];
  complexExistTabs: string[];
};

export type ComplexArticle = {
  articleNo: string;
  articleName: string;
  articleStatus: string;
  realEstateTypeCode: string;
  realEstateTypeName: string;
  articleRealEstateTypeCode: string;
  articleRealEstateTypeName: string;
  tradeTypeCode: string;
  tradeTypeName: string;
  verificationTypeCode: string;
  floorInfo: string;
  priceChangeState: string;
  isPriceModification: boolean;
  dealOrWarrantPrc: string;
  areaName: string;
  area1: number;
  area2: number;
  direction: string;
  articleConfirmYmd: string;
  representativeImgUrl: string;
  representativeImgTypeCode: string;
  representativeImgThumb: string;
  siteImageCount: number;
  articleFeatureDesc: string;
  tagList: string[];
  buildingName: string;
  sameAddrCnt: number;
  sameAddrDirectCnt: number;
  sameAddrMaxPrc: string;
  sameAddrMinPrc: string;
  cpid: string;
  cpName: string;
  cpPcArticleUrl: string;
  cpPcArticleBridgeUrl: string;
  cpPcArticleLinkUseAtArticleTitleYn: boolean;
  cpPcArticleLinkUseAtCpNameYn: boolean;
  cpMobileArticleUrl: string;
  cpMobileArticleLinkUseAtArticleTitleYn: boolean;
  cpMobileArticleLinkUseAtCpNameYn: boolean;
  latitude: string;
  longitude: string;
  isLocationShow: boolean;
  realtorName: string;
  realtorId: string;
  tradeCheckedByOwner: boolean;
  isDirectTrade: boolean;
  isInterest: boolean;
  isComplex: boolean;
  detailAddress: string;
  detailAddressYn: string;
};

export type ComplexArticleResponse = {
  isMoreData: boolean;
  articleList: ComplexArticle[];
  mapExposedCount: number;
  nonMapExposedIncluded: boolean;
};
