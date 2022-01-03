import "./App.css";

import { useService } from "@xstate/react";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

import Farm from "./components/farm/Farm";
import {
  Charity,
  Connecting,
  Creating,
  Error,
  GasWarning,
  SaveError,
  Saving,
  TimerComplete,
  Unsupported,
  Welcome,
} from "./components/modals";
import { Crafting } from "./components/modals/Crafting";
import { Banner } from "./components/ui/HalveningBanner";
import {
  BlockchainEvent,
  BlockchainState,
  Context,
  service,
} from "./machine";
import { Donation } from "./types/contract";
import { whitelist } from "../whitelist";

export const App: React.FC = () => {
  const [machineState, send] = useService<
    Context,
    BlockchainEvent,
    BlockchainState
  >(service);
  const [account, setAccount] = useState(null);

  React.useEffect(() => {
    setAccount(window.ethereum.selectedAddress)
    if (window.ethereum) {
      window.ethereum.on("networkChanged", () => {
        console.log("Network changed");
        send("NETWORK_CHANGED");
      });

      window.ethereum.on("accountsChanged", function (accounts) {
        send("ACCOUNT_CHANGED");
        setAccount(accounts[0].toLowerCase())
      });
    }
  }, [send]);

  const getStarted = () => {
    send("GET_STARTED");
  };

  const createFarm = (donation: Donation) => {
    send("DONATE", {
      donation: { charity: donation.charity, value: donation.value },
    });
  };

  React.useEffect(() => {
    send("GET_STARTED");
  }, [send]);

  return (
    <>
    {!whitelist.find(v => v.toLowerCase() === account) ? <>화이트 리스트 등록 ㄱㄱ</>
    :
    <>
      <div id="container" style={{ width: "1000px" }}>
        <Farm  />

        <Modal centered show={machineState.matches("loading")}>
          <Connecting />
        </Modal>

        {/* <Modal centered show={machineState.matches("unsupported")}>
          <Unsupported />
        </Modal> */}

        <Modal centered show={machineState.matches("initial")}>
          <Welcome onGetStarted={getStarted} />
        </Modal>

        <Modal centered show={machineState.matches("registering")}>
          <Charity onSelect={createFarm} />
        </Modal>

        <Modal centered show={machineState.matches("creating")}>
          <Creating />
        </Modal>

        <Modal
          centered
          show={
            machineState.matches("confirming") ||
            machineState.matches("upgrading") ||
            machineState.matches("rewarding") ||
            machineState.matches("collecting")
          }
        >
          <Saving />
        </Modal>

        <Modal centered show={machineState.matches("crafting")}>
          <Crafting />
        </Modal>

        <Modal centered show={machineState.matches("timerComplete")}>
          <TimerComplete />
        </Modal>

        <Modal centered show={machineState.matches("failure")}>
          <Error code={machineState.context.errorCode} />
        </Modal>

        <Modal centered show={machineState.matches("warning")}>
          <GasWarning gasPrice={machineState.context.gasPrice} />
        </Modal>

        <Modal centered show={machineState.matches("saveFailure")}>
          <SaveError code={machineState.context.errorCode} />
        </Modal>
      </div>
      <Banner />
      </>
        }
    </>
  );
};

export default App;
