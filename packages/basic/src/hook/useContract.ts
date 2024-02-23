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
  TierInfo,
} from "../types";
import { useUser } from "./useUser";
import { ethers } from "ethers";

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
  const [tierInfo, setTierInfo] = useState<TierInfo | undefined>(undefined);
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
        tierInfo,
      } = ProjectManagerSDK;

      setProjectInfo(projectInfo);
      setManageInfo(manageInfo);
      setSaleInfo(saleInfo);
      setTimeInfo(timeInfo);
      setClaimInfo(claimInfo);
      setStatus(status);
      setTokenInfo(tokenInfo);
      setUserInfo(userInfo);
      setTierInfo(tierInfo);
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
    tierInfo,
    isSet,
    status,
    participate,
  };
};

type ScheduleItem = {
  date: number;
  amount: number;
};

export const useSchedule = () => {
  const { claimInfo } = useProjectInfo();
  const [schedule, setSchedule] = useState<ScheduleItem[] | undefined>(
    undefined
  );

  useEffect(() => {
    if (claimInfo) {
      const {
        firstClaimTime,
        secondClaimTime,
        claimInterval,
        totalClaimCounts,
      } = claimInfo;
      console.log("claimInfo", claimInfo);

      if (
        firstClaimTime &&
        secondClaimTime &&
        claimInterval &&
        totalClaimCounts
      ) {
        let scheduleArr: any[] = [];
        for (let i = 1; i <= totalClaimCounts; i++) {
          console.log("gogo", i);

          if (i === 1) {
            scheduleArr.push({
              date: firstClaimTime,
              amount: 10000000,
            });
          }
          if (i === 2) {
            scheduleArr.push({
              date: secondClaimTime,
              amount: 10000000,
            });
          }

          if (i > 2) {
            scheduleArr.push({
              date: secondClaimTime + (i - 2) * claimInterval,
              amount: 10000000,
            });
          }
        }
        setSchedule(scheduleArr);
      }
    }
  }, [claimInfo]);

  return { schedule };
};
