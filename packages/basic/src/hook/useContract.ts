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
import { Contract, ethers } from "ethers";
import { getSigner } from "../utils/signer";
import { L2_TOKEN } from "../constants/config";
import { parseEther } from "ethers/lib/utils";

export const useContract = () => {};

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

  const { userAccount } = useUser();
  const ProjectManagerSDK = useMemo(
    () =>
      new ProjectManager({
        chainId: 5050,
        l2Token: L2_TOKEN as string,
        account: userAccount,
      }),
    [userAccount]
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
      fetchProjectInfo().catch((e) => {});
    }
  }, [ProjectManagerSDK]);

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
    ProjectManagerSDK,
  };
};

type ScheduleItem = {
  date: number;
  amount: number;
};

export const useProjectContract = () => {
  const { userAccount } = useUser();
  const { status, ProjectManagerSDK } = useProjectInfo();

  const SaleVaultProxy = ProjectManagerSDK.SaleVaultProxy;
  const L2ProjectManagerProxy = ProjectManagerSDK.L2ProjectManagerProxy;

  const participate = async (amount?: number) => {
    const amountBN = parseEther(amount?.toString() ?? "0");

    if (!SaleVaultProxy) return;
    const signer = await getSigner();
    switch (status?.currentStep) {
      case "whitelist":
        if (signer) await SaleVaultProxy.connect(signer).addWhiteList(L2_TOKEN);
        break;
      case "round1":
        console.log("round1");
        if (amount && signer)
          await SaleVaultProxy.connect(signer).round1Sale(L2_TOKEN, amountBN);
        break;
      case "round2":
        if (amount && signer)
          await SaleVaultProxy.connect(signer).round2Sale(L2_TOKEN, amountBN);
        break;
      case "claim":
        if (signer) {
          await SaleVaultProxy.connect(signer).claim(L2_TOKEN);
        }
        break;
      default:
        break;
    }
  };

  const exchangeWtonToTos = async (amount: number) => {
    const signer = await getSigner();
    const amountBN = parseEther(amount.toString());
    if (signer && SaleVaultProxy) {
      const hardcap = await SaleVaultProxy.hardcapCalcul(L2_TOKEN);
      if (hardcap.eq(0)) {
        return alert("This project failed to meet the hard cap condition");
      }
      await SaleVaultProxy.connect(signer).exchangeWTONtoTOS(
        L2_TOKEN,
        amountBN
      );
    }
  };

  const claimAll = async () => {
    const isAvailable = await L2ProjectManagerProxy.availableClaimAll(
      L2_TOKEN,
      ["TEAM"]
    );
    const signer = await getSigner();

    if (signer)
      await L2ProjectManagerProxy.connect(signer).claimAll(L2_TOKEN, ["TEAM"]);
  };

  return { participate, claimAll, exchangeWtonToTos };
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

      if (
        firstClaimTime &&
        secondClaimTime &&
        claimInterval &&
        totalClaimCounts
      ) {
        let scheduleArr: any[] = [];
        for (let i = 1; i <= totalClaimCounts; i++) {
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
