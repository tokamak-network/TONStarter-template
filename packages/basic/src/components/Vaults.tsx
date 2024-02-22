import HeadTitle from "./public/HeadTitle";

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

function VaultCard(props: { title: string; address: string }) {
  const { title, address } = props;
  return (
    <div
      style={{
        width: "200px",
        height: "250px",
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
        }}
      >
        <span>{title}</span>
        <button
          onClick={() =>
            window.open(
              `https://explorer.titan-goerli.tokamak.network/address/${address}`
            )
          }
        >
          explorer
        </button>
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
      <VaultInfoRow title="Token" content={"10,000,000 TKB"} />
      <VaultInfoRow title="Round 1." content={"5,000,000 TKB"} />
      <VaultInfoRow title="Round 2." content={"5,000,000 TKB"} />
      <VaultInfoRow title="Liquidity" content={"1,000,000 TKB"} />
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          columnGap: "10px",
        }}
      >
        <VaultCard title="Sale" address="0x" />
        <VaultCard title="Liquidity" address="0x" />
        <VaultCard title="Ecosystem" address="0x" />
        <VaultCard title="Team" address="0x" />
        <VaultCard title="TONStarter" address="0x" />
      </div>
    </section>
  );
}

export default Vaults;
