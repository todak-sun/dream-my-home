import { SingleMarkerV2Response, ComplexOverview, ComplexArticle } from './response/index';
export type MyComplexType = SingleMarkerV2Response & {
  complexNo: string;
  cortarNo: string;
  cortarAddress: string;
  detailAddress: string;
  useApproveYmd: string;
  overview: ComplexOverview | null;
  articles: ComplexArticle[];
};
