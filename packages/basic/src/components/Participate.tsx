import React from "react";
import { useMemo } from "react";
import { useProjectInfo } from "../hook";
import HeadTitle from "./public/HeadTitle";
import { useUser } from "../hook/useUser";
import { formatTimestamp } from "../utils/convertTimestamp";

function Participate() {
  const { status, userInfo, saleInfo, timeInfo, tokenInfo } = useProjectInfo();
  const { tonBalance } = useUser();

  console.log("userInfo", userInfo);

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
                border: "1px solid black",
                borderRadius: 6,
                marginLeft: 10,
              }}
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
  }, [status?.currentStep]);

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
            fontSize: 13,
            height: "100%",
            display: "flex",
            marginTop: "25px",
          }}
        >
          <article style={{ display: "flex", flexDirection: "column" }}>
            <span>Tier 1 (100 sTOS) : 2,000,000 {tokenInfo?.tokenSymbol}</span>
            <span>Tier 2 (200 sTOS) : 1,000,000 {tokenInfo?.tokenSymbol}</span>
            <span>
              Tier 3 (1,000 sTOS) : 1,000,000 {tokenInfo?.tokenSymbol}
            </span>
            <span>
              Tier 4 (4,000 sTOS) : 1,000,000 {tokenInfo?.tokenSymbol}
            </span>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "12px",
                fontSize: 15,
              }}
            >
              <span>Your sTOS: 5,000</span>
              <span style={{ color: "#0070ED", fontWeight: "bold" }}>
                Your tier:
              </span>
            </div>
          </article>
          <div
            style={{
              borderLeft: "1px solid black",
              marginLeft: "15px",
              marginRight: "15px",
            }}
          ></div>
          <article
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>
              Round 1 - {saleInfo?.total1rdSaleAmount} {tokenInfo?.tokenSymbol}{" "}
            </span>
            <span>
              {" "}
              {formatTimestamp(timeInfo?.round1StartTime) ??
                "round1StartTime"}{" "}
              ~ {formatTimestamp(timeInfo?.round1EndTime) ?? "round1EndTime"}{" "}
            </span>
            <span>
              Round 2 - {saleInfo?.total1rdSaleAmount} {tokenInfo?.tokenSymbol}
            </span>
            <span>
              {" "}
              {formatTimestamp(timeInfo?.round2StartTime) ?? "-"} ~{" "}
              {formatTimestamp(timeInfo?.round2EndTime) ?? "-"}{" "}
            </span>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "auto",
                fontSize: 15,
              }}
            >
              <span style={{ color: "#0070ED", fontWeight: "bold" }}>
                Current status : {status?.currentStep ?? "not setup yet"}
              </span>
            </div>
          </article>
        </section>
      </div>
    </section>
  );
}

export default Participate;
