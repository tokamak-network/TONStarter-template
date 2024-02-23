import React from "react";
import { useMemo } from "react";
import { useProjectInfo } from "../hook";
import HeadTitle from "./public/HeadTitle";
import { useUser } from "../hook/useUser";
import { formatTimestamp } from "../utils/convertTimestamp";
import commafy from "../utils/commafy";

function Participate() {
  const {
    status,
    userInfo,
    saleInfo,
    timeInfo,
    tokenInfo,
    claimInfo,
    manageInfo,
    participate,
    tierInfo,
  } = useProjectInfo();
  const { tonBalance } = useUser();

  const ParticipatingContainer = useMemo(() => {
    switch (status?.currentStep) {
      case "snapshot":
        return <>waiting for snapshot</>;

      case "whitelist":
        return (
          <>
            {" "}
            <button
              style={{
                backgroundColor: "#0070ED",
                border: 0,
                color: "#fff",
                borderRadius: 6,
                marginLeft: 10,
              }}
              onClick={() => participate(1)}
            >
              add whitelist
            </button>
          </>
        );
      case "round1":
        return (
          <>
            {" "}
            <input style={{ borderRadius: 10 }}></input>
            <button
              style={{
                border: "1px solid black",
                borderRadius: 6,
                marginLeft: 10,
              }}
            >
              claim
            </button>
          </>
        );
      case "round2":
        return (
          <>
            {" "}
            <input style={{ borderRadius: 10 }}></input>
            <button
              style={{
                border: "1px solid black",
                borderRadius: 6,
                marginLeft: 10,
              }}
            >
              claim
            </button>
          </>
        );
      case "claim":
        return (
          <>
            {" "}
            <input style={{ borderRadius: 10 }}></input>
            <button
              style={{
                border: "1px solid black",
                borderRadius: 6,
                marginLeft: 10,
              }}
            >
              claim
            </button>
          </>
        );
      default:
        return <>-</>;
    }
  }, [status?.currentStep, participate]);

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <HeadTitle title="Participate"></HeadTitle>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          columnGap: "25px",
          alignItems: "center",
        }}
      >
        <article style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex" }}>{ParticipatingContainer}</div>
          <div
            style={{ display: "flex", flexDirection: "column", marginTop: 10 }}
          >
            <div>
              <span>your TON : {tonBalance ?? "-"}</span>
            </div>
            <div>
              <span>Puchased : </span>
            </div>
            {status?.currentStep === "claim" && (
              <div>
                <span>Available to Claim : </span>
              </div>
            )}
            {status?.currentStep === "claim" && (
              <div>
                <span>Remained Amount : </span>
              </div>
            )}
          </div>
        </article>
        <section
          style={{
            fontSize: 16,
            height: "100%",
            display: "flex",
            marginTop: "25px",
          }}
        >
          <article
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span
              style={{
                color: status?.currentStep === "snapshot" ? "#0070ED" : "",
                fontWeight: status?.currentStep === "snapshot" ? "bold" : "",
              }}
            >
              Snapshot{" "}
            </span>
            <span
              style={{
                marginBottom: 5,
                color: status?.currentStep === "snapshot" ? "#0070ED" : "",
                fontWeight: status?.currentStep === "snapshot" ? "bold" : "",
              }}
            >
              {formatTimestamp(timeInfo?.snapshot)}
            </span>
            <span>Whitelist</span>
            <span style={{ marginBottom: 5 }}>
              {" "}
              {formatTimestamp(timeInfo?.whiteListStartTime) ??
                "round1StartTime"}{" "}
              ~ {formatTimestamp(timeInfo?.whiteListEndTime) ?? "round1EndTime"}{" "}
            </span>
            <span>
              Round 1 - {commafy(manageInfo?.set1rdTokenAmount, 0)}{" "}
              {tokenInfo?.tokenSymbol}{" "}
            </span>
            <span style={{ marginBottom: 5 }}>
              {" "}
              {formatTimestamp(timeInfo?.round1StartTime) ??
                "round1StartTime"}{" "}
              ~ {formatTimestamp(timeInfo?.round1EndTime) ?? "round1EndTime"}{" "}
            </span>
            <span>
              Round 2 - {commafy(manageInfo?.set2rdTokenAmount, 0)}{" "}
              {tokenInfo?.tokenSymbol}
            </span>
            <span style={{ marginBottom: 5 }}>
              {" "}
              {formatTimestamp(timeInfo?.round2StartTime) ?? "-"} ~{" "}
              {formatTimestamp(timeInfo?.round2EndTime) ?? "-"}{" "}
            </span>
            <span>Claim </span>
            <span style={{ marginBottom: 5 }}>
              {" "}
              {formatTimestamp(claimInfo?.firstClaimTime) ?? "-"} ~{" "}
              {formatTimestamp(
                (claimInfo?.secondClaimTime as number) +
                  ((claimInfo?.totalClaimCounts as number) - 2) *
                    //@ts-ignore
                    claimInfo?.claimInterval
              ) ?? "-"}{" "}
            </span>
          </article>
          <div
            style={{
              borderLeft: "1px solid black",
              marginLeft: "15px",
              marginRight: "15px",
            }}
          ></div>
          <article style={{ display: "flex", flexDirection: "column" }}>
            <span>
              Tier 1 (100 sTOS) : {commafy(tierInfo?.[1].amount, 0)}{" "}
              {tokenInfo?.tokenSymbol}
            </span>
            <span>
              Tier 2 (200 sTOS) : {commafy(tierInfo?.[2].amount, 0)}{" "}
              {tokenInfo?.tokenSymbol}
            </span>
            <span>
              Tier 3 (1,000 sTOS) : {commafy(tierInfo?.[3].amount, 0)}{" "}
              {tokenInfo?.tokenSymbol}
            </span>
            <span>
              Tier 4 (4,000 sTOS) : {commafy(tierInfo?.[4].amount, 0)}{" "}
              {tokenInfo?.tokenSymbol}
            </span>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "auto",
                marginBottom: 6,
                fontSize: 15,
              }}
            >
              <span>Your sTOS: </span>
              <span style={{ color: "#0070ED", fontWeight: "bold" }}>
                Your tier:
              </span>
            </div>
          </article>
        </section>
      </div>
    </section>
  );
}

export default Participate;
