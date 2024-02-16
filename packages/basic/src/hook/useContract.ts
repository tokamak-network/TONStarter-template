import { useEffect, useState } from "react";
import { ProjectManager } from "tokamak-dapp-sdk/dist/__commonjs/tonstarter";
import {
  ClaimInfo,
  ManageInfo,
  ProjectInfo,
  SaleInfo,
  Status,
  TimeInfo,
  UserInfo,
} from "../types";
import { Contract } from "ethers";

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
  const [status, setStatus] = useState<Status | undefined>(undefined);
  const L2_TOKEN = process.env.REACT_APP_L2TOKEN;

  useEffect(() => {
    const fetchProjectInfo = async () => {
      const ProjectManagerSDK = new ProjectManager({
        chainId: 5050,
        l2Token: L2_TOKEN as string,
      });

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
      } = ProjectManagerSDK;

      if (
        projectInfo &&
        manageInfo &&
        saleInfo &&
        timeInfo &&
        claimInfo &&
        userInfo &&
        status
      ) {
        setProjectInfo(projectInfo);
        setManageInfo(manageInfo);
        setSaleInfo(saleInfo);
        setTimeInfo(timeInfo);
        setClaimInfo(claimInfo);
        setStatus(status);
        setUserInfo(userInfo);
      }
    };

    if (L2_TOKEN !== undefined) {
      fetchProjectInfo().catch((e) => {
        console.log("**fetch error on fetchProjectInfo()**");
        console.log(e);
      });
    }
  }, [L2_TOKEN]);

  return {
    projectInfo,
    manageInfo,
    saleInfo,
    timeInfo,
    claimInfo,
    userInfo,
    status,
  };
};
