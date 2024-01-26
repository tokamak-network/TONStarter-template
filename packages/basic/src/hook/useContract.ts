import { Contract, ethers } from "ethers";
import { MultiChainSDK } from "../constants/sdk";
import { useEffect, useState } from "react";
import { ProjectInfo } from "../types";

export const useContract = () => {};

export const useTONStarterC = () => {};

export const useProjectInfo = () => {
  const [projectInfo, setProjectInfo] = useState<ProjectInfo | undefined>(
    undefined
  );
  const L2ProjectManagerProxy = MultiChainSDK.getContract(
    "L2ProjectManagerProxy"
  );
  const L2_TOKEN = process.env.REACT_APP_L2TOKEN;

  useEffect(() => {
    const fetchProjectInfo = async () => {
      const project = await L2ProjectManagerProxy.projects(L2_TOKEN);
      console.log(project);
      const result = {
        name: project.projectName,
        id: Number(project?.projectId?.toString()),
        owner: project.projectOwner,
        l1Token: project.l1Token,
        l2Token: project.l2Token,
      };
      setProjectInfo(result);
    };

    if (projectInfo === undefined) {
      fetchProjectInfo();
    }
  }, [L2ProjectManagerProxy, L2_TOKEN]);

  return { projectInfo };
};
