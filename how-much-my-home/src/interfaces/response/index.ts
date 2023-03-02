export interface NaverLandMarker {
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
}
