import React from "react";
import images from "../constantes/images";

const WaitingPage = () => {
  return (
    <div id="waitingPage__Container">
      <div id="logo__Container">
        <img src={images.logo} alt="appLogo" id="waitingPage__Logo" />
      </div>
      <div id="waitingPage__footer">
        <h2 id="footer-I">Developped By</h2>
        <h4 id="footer-II">Lord Ulf</h4>
      </div>
    </div>
  );
};
export default WaitingPage;
