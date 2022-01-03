import React, { useState } from "react";

import alert from "../../images/ui/expression_alerted.png";
import closeIcon from "../../images/ui/close.png";

import "./Banner.css";
interface Props {
  account: string
}
export const Banner: React.FC<Props> = ({ account }) => {
const [show, setShow] = useState(true);


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
