import React from "react";
import { useUser } from "../hook/useUser";

function Header() {
  const { connectWallet, userAccount } = useUser();
  return (
    <header
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "flex-end",
        paddingRight: 20,
      }}
    >
      <button
        style={{
          width: 134,
          height: 35,
          background: "#0070ED",
          color: "#fff",
          border: "none",
          borderRadius: 10,
          borderColor: "none",
          cursor: "pointer",
        }}
        onClick={connectWallet}
      >
        {userAccount
          ? `${userAccount.slice(0, 4)}...${userAccount.slice(-4)}`
          : "Connect Wallet"}
      </button>
    </header>
  );
}

export default Header;
