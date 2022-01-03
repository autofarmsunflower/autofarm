import React, { useState } from "react";

import alert from "../../images/ui/expression_alerted.png";
import closeIcon from "../../images/ui/close.png";

import "./Banner.css";

export const Banner: React.FC = () => {
  const [show, setShow] = useState(true);
  const [account, setAccount] = useState(null);

  React.useEffect(() => {
    setAccount(window.ethereum.selectedAddress)
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", function (accounts) {
        setAccount(accounts[0])
      });
    }
  }, []);

  if (!show) {
    return null;
  }

  return (
    <div id="halvening-banner">
      <img src={alert} />
      <div>
        <span>
          {account}
        </span>
      </div>
      <img src={closeIcon} id="banner-close" onClick={() => setShow(false)} />
    </div>
  );
};
