import { useEffect, useState } from "react";
import ProjectImage from "../assets/ProjectImage.svg";
import "./overview.css";
import HeadTitle from "./public/HeadTitle";
import { useProjectInfo } from "../hook";
import { formatTimestamp } from "../utils/convertTimestamp";

function ProgressBar() {
  const [progress, setProgress] = useState(0); // State to manage progress

  //   const { saleInfo } = useProjectInfo();
  // const progress = saleInfo?.total1rdSaleAmount / saleInfo?.total1rdSaleAmount * 100;

  // Function to increase progress
  const increaseProgress = () => {
    if (progress > 100) {
      setProgress(100);
    }
  };

  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
  );
}

function Overview() {
  const { projectInfo, saleInfo, status } = useProjectInfo();

  return (
    <section
      style={{
        marginTop: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <header
        style={{
          textAlign: "center",
          backgroundColor: "#F1F5F9",
          borderRadius: 10,
          padding: 8,
          fontSize: 18,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span>TONStarter</span>
        <span style={{ color: projectInfo?.name ? "rgb(69, 214, 32)" : "red" }}>
          $
          {projectInfo?.name ??
            "You need to check whether your L2 Token Address or vaults have been set up."}
        </span>
      </header>
      <img
        src={ProjectImage}
        alt={"ProjectImage"}
        style={{ width: 105, height: 105, marginTop: 20 }}
      />
      <article style={{ textAlign: "center" }}>
        <HeadTitle
          title={status?.currentStep ?? "-"}
          style={{ margin: 0, marginBottom: 0 }}
        ></HeadTitle>
        <div style={{ marginBottom: 15 }}>{`(${formatTimestamp(
          status?.currentStepEndDate
        )})`}</div>
        <ProgressBar />
        {saleInfo ? (
          <p style={{ textAlign: "right", fontSize: 12, fontWeight: "bold" }}>
            <span style={{ color: "rgb(69, 214, 32)" }}>
              {" "}
              {saleInfo?.total1rdSaleAmount}{" "}
            </span>
            OF {saleInfo?.total1rdSaleAmount} {} SOLD
          </p>
        ) : (
          "-"
        )}
      </article>
    </section>
  );
}

export default Overview;
