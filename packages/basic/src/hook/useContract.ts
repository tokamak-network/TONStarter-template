import { useEffect, useState, useMemo } from "react";
import { ProjectManager } from "tokamak-dapp-sdk/dist/__commonjs/tonstarter";
import {
  ClaimInfo,
  ManageInfo,
  ProjectInfo,
  SaleInfo,
  Status,
  TimeInfo,
  UserInfo,
  TokenInfo,
} from "../types";
import { Contract } from "ethers";
import { useUser } from "./useUser";

export const useContract = () => {};

export const useTONStarterC = () => {};

export const useProjectInfo = () => {
  const [projectInfo, setProjectInfo] = useState<ProjectInfo | undefined>(
    undefined
  );
  const [manageInfo, setManageInfo] = useState<ManageInfo | undefined>(
    undefined
  );
  const [saleInfo, setSaleInfo] = useState<SaleInfo | undefined>(undefined);
  const [timeInfo, setTimeInfo] = useState<TimeInfo | undefined>(undefined);
  const [claimInfo, setClaimInfo] = useState<ClaimInfo | undefined>(undefined);
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | undefined>(undefined);
  const [status, setStatus] = useState<Status | undefined>(undefined);
  const [isSet, setIsSet] = useState<Boolean | undefined>(false);

  const L2_TOKEN = process.env.REACT_APP_L2TOKEN;
  const { userAccount } = useUser();

  const ProjectManagerSDK = useMemo(
    () =>
      new ProjectManager({
        chainId: 5050,
        l2Token: L2_TOKEN as string,
        account: userAccount,
      }),
    [L2_TOKEN, userAccount]
  );

  useEffect(() => {
    const fetchProjectInfo = async () => {
      await ProjectManagerSDK.syncData();

      const {
        projectInfo,
        manageInfo,
        saleInfo,
        timeInfo,
        claimInfo,
        userInfo,
        isSet,
        status,
        tokenInfo,
      } = ProjectManagerSDK;

      setProjectInfo(projectInfo);
      setManageInfo(manageInfo);
      setSaleInfo(saleInfo);
      setTimeInfo(timeInfo);
      setClaimInfo(claimInfo);
      setStatus(status);
      setTokenInfo(tokenInfo);
      setUserInfo(userInfo);
      setIsSet(isSet);
    };

    if (ProjectManagerSDK !== undefined) {
      fetchProjectInfo().catch((e) => {
        console.log("**fetch error on fetchProjectInfo()**");
        console.log(e);
      });
    }
  }, [ProjectManagerSDK]);

  const participate = async (amount: number) => {
    await ProjectManagerSDK.participate(amount);
  };

  return {
    projectInfo,
    manageInfo,
    saleInfo,
    timeInfo,
    claimInfo,
    userInfo,
    tokenInfo,
    isSet,
    status,
    participate,
  };
};
