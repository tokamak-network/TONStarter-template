import HeadTitle from "./public/HeadTitle";
import { VaultType } from "../types";
import { useMemo } from "react";
import { useProjectContract, useProjectInfo, useSchedule } from "../hook";
import { formatTimestamp } from "../utils/convertTimestamp";
import commafy from "../utils/commafy";
import { L2_TOKEN } from "../constants/config";

function VaultInfoRow({
  title,
  content,
  onClick,
  contentStyle,
}: {
  title: string;
  content?: string | number;
  onClick?: () => void;
  contentStyle?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        fontSize: 14,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <span>{title}</span>
      <span style={{ ...contentStyle }} onClick={onClick}>
        {content}
      </span>
    </div>
  );
}

function ScheduleRow() {
  const { tokenInfo } = useProjectInfo();
  const { schedule } = useSchedule();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        marginTop: 20,
      }}
    >
      <span style={{ fontSize: 14, marginTop: "auto", textAlign: "center" }}>
        ---- Claim Schedule ----
      </span>
      {schedule?.map(
        (
          item: {
            date: number;
            amount: number;
          },
          index: number
        ) => {
          return (
            <>
              {/* <VaultInfoRow
                title={`round ${index + 1}`}
                content={`${commafy(item.amount)} ${tokenInfo?.tokenSymbol}`}
              />
              <span style={{ fontSize: 12, textAlign: "right" }}>
                {formatTimestamp(item.date)}
              </span> */}
              <VaultInfoRow
                title={`round ${index + 1}`}
                content={`${formatTimestamp(item.date)}`}
              />
            </>
          );
        }
      )}
    </div>
  );
}

function VaultCard(props: { vaultType: VaultType; title: string }) {
  const { title, vaultType } = props;
  const { projectInfo, tokenInfo, manageInfo } = useProjectInfo();
  const { exchangeWtonToTos } = useProjectContract();

  const rowComponents = useMemo(() => {
    const tokenSymbol = tokenInfo?.tokenSymbol;
    const VaultAdmin = () => {
      return (
        <VaultInfoRow
          title="Vault Admin"
          content={`${projectInfo?.owner.slice(
            0,
            4
          )}...${projectInfo?.owner.slice(-4)}`}
          contentStyle={{
            cursor: "pointer",
            color: "blue",
            textDecoration: "underline",
          }}
          onClick={() =>
            window.open(
              `https://explorer.titan-goerli.tokamak.network/address/${projectInfo?.owner}`
            )
          }
        />
      );
    };

    switch (props.vaultType) {
      case "Sale":
        return (
          <>
            <VaultInfoRow
              title="Token"
              content={`${
                manageInfo &&
                commafy(
                  manageInfo?.set1rdTokenAmount + manageInfo?.set2rdTokenAmount,
                  0
                )
              } ${tokenSymbol}`}
            />
            <VaultAdmin />
            <ScheduleRow />
          </>
        );
      case "Liquidity":
        return (
          <>
            <VaultInfoRow title="Token" content={`${tokenSymbol}`} />
            <VaultInfoRow title="Price Range" content={"Full"} />
            <VaultInfoRow title="Pool Address" content={"-"} />
            <VaultAdmin />
          </>
        );
      case "TONStarter":
        return (
          <>
            <VaultInfoRow title="Token" content={`${tokenSymbol}`} />
            <span style={{ fontSize: 12, textAlign: "right" }}>
              TON-TOS LP Reward : 50%
            </span>
            <span style={{ fontSize: 12, textAlign: "right" }}>
              TON Staker : 25%
            </span>
            <span style={{ fontSize: 12, textAlign: "right" }}>
              TOS Staker : 25%
            </span>
            <VaultAdmin />
            <ScheduleRow />
          </>
        );
      default:
        return (
          <>
            <VaultInfoRow title="Token" content={`${tokenSymbol}`} />
            <VaultAdmin />
            <ScheduleRow />
          </>
        );
    }
  }, [props, projectInfo?.owner, tokenInfo?.tokenSymbol, manageInfo]);

  return (
    <div
      style={{
        width: "225px",
        minHeight: "250px",
        border: "1px solid black",
        borderRadius: 16,
        display: "flex",
        padding: "10px",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: "35px",
        }}
      >
        <span style={{ fontSize: 18 }}>{title}</span>
        {vaultType === "Sale" && (
          <button
            style={{
              backgroundColor: "#0070ED",
              border: 0,
              color: "#fff",
              borderRadius: 6,
            }}
            onClick={() => exchangeWtonToTos(10000)}
          >
            Send
          </button>
        )}
        {vaultType === "Liquidity" && (
          <button
            style={{
              backgroundColor: "#0070ED",
              border: 0,
              color: "#fff",
              borderRadius: 6,
            }}
            onClick={() => {}}
          >
            Create a pool
          </button>
        )}
      </div>
      <span
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "black",
          marginTop: 5,
          marginBottom: 5,
        }}
      ></span>
      {rowComponents}
    </div>
  );
}

function Vaults() {
  const { claimAll } = useProjectContract();
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <HeadTitle title="Vaults"></HeadTitle>
      <button
        style={{
          backgroundColor: "#0070ED",
          border: 0,
          color: "#fff",
          borderRadius: 6,
          marginBottom: 20,
        }}
        onClick={() => claimAll()}
      >
        Distribute all
      </button>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          columnGap: "10px",
        }}
      >
        <VaultCard vaultType="Sale" title="Sale" />
        <VaultCard vaultType="Liquidity" title="Liquidity" />
        <VaultCard vaultType="Ecosystem" title="Ecosystem" />
        <VaultCard vaultType="Team" title="Team" />
        <VaultCard vaultType="TONStarter" title="TONStarter" />
      </div>
    </section>
  );
}

export default Vaults;
