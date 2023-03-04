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
