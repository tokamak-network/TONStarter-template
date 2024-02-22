import HeadTitle from "./public/HeadTitle";
import { VaultType } from "../types";
import { useMemo } from "react";

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
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        marginTop: 10,
      }}
    >
      <span style={{ fontSize: 14, marginTop: "auto" }}>
        --- Claim Schedule ---
      </span>
      <VaultInfoRow title="round 1" content={"10,000,000 TKB"} />
      <span style={{ fontSize: 12, textAlign: "right" }}>
        2022.06.24 17:00:01
      </span>
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
        width: "200px",
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
        {vaultType === "Liquidity" && <button onClick={() => {}}>send</button>}
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
      <button style={{ marginBottom: 20 }}>distribute all</button>
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
