import HeadTitle from "./public/HeadTitle";
import { VaultType } from "../types";
import { useMemo } from "react";
import { useProjectInfo, useSchedule } from "../hook";
import { formatTimestamp } from "../utils/convertTimestamp";
import commafy from "../utils/commafy";

function VaultInfoRow({
  title,
  content,
}: {
  title: string;
  content: string | number;
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
      <span>{content}</span>
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
      <span style={{ fontSize: 14, marginTop: "auto" }}>
        --- Claim Schedule ---
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
              <VaultInfoRow
                title={`round ${index + 1}`}
                content={`${commafy(item.amount)} ${tokenInfo?.tokenSymbol}`}
              />
              <span style={{ fontSize: 12, textAlign: "right" }}>
                {formatTimestamp(item.date)}
              </span>
            </>
          );
        }
      )}
    </div>
  );
}

function VaultCard(props: {
  vaultType: VaultType;
  title: string;
  address: string;
}) {
  const { title, address, vaultType } = props;

  const rowComponents = useMemo(() => {
    switch (props.vaultType) {
      case "Sale":
        return (
          <>
            <VaultInfoRow title="Token" content={"10,000,000 TKB"} />
            <VaultInfoRow title="Round 1." content={"5,000,000 TKB"} />
            <VaultInfoRow title="Round 2." content={"5,000,000 TKB"} />
            <VaultInfoRow title="Vault Admin" content={"0x"} />
            <ScheduleRow />
          </>
        );
      case "Liquidity":
        return (
          <>
            <VaultInfoRow title="Token" content={"10,000,000 TKB"} />
            <VaultInfoRow title="Price Range" content={"Full"} />
            <VaultInfoRow title="Pool Address" content={"0x"} />
            <VaultInfoRow title="Vault Admin" content={"0x"} />
            <ScheduleRow />
          </>
        );
      case "TONStarter":
        return (
          <>
            <VaultInfoRow title="Token" content={"10,000,000 TKB"} />
            <span style={{ fontSize: 12, textAlign: "right" }}>
              TON-TOS LP Reward : 50%
            </span>
            <span style={{ fontSize: 12, textAlign: "right" }}>
              TON Staker : 25%
            </span>
            <span style={{ fontSize: 12, textAlign: "right" }}>
              TOS Staker : 25%
            </span>
            <VaultInfoRow title="Vault Admin" content={"0x"} />
            <ScheduleRow />
          </>
        );
      default:
        return (
          <>
            <VaultInfoRow title="Token" content={"10,000,000 TKB"} />
            <VaultInfoRow title="Vault Admin" content={"0x"} />
            <ScheduleRow />
          </>
        );
    }
  }, [props]);

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
            onClick={() => {}}
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
        <VaultCard vaultType="Sale" title="Sale" address="0x" />
        <VaultCard vaultType="Liquidity" title="Liquidity" address="0x" />
        <VaultCard vaultType="Ecosystem" title="Ecosystem" address="0x" />
        <VaultCard vaultType="Team" title="Team" address="0x" />
        <VaultCard vaultType="TONStarter" title="TONStarter" address="0x" />
      </div>
    </section>
  );
}

export default Vaults;
