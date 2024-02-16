import {
  ProjectInfo,
  ManageInfo,
  SaleInfo,
  TimeInfo,
  ClaimInfo,
  UserInfoMap,
  Status,
} from "tokamak-dapp-sdk/dist/types/tonstarter";

type UserInfo = UserInfoMap[keyof UserInfoMap];

export type {
  ProjectInfo,
  ManageInfo,
  SaleInfo,
  TimeInfo,
  ClaimInfo,
  UserInfo,
  UserInfoMap,
  Status,
};
