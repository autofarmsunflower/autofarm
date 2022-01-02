import React from "react";

import watering from "../../images/characters/watering.gif";
import { ActionableItem, Fruit, Square } from "../../types/contract";
import { FruitItem } from "../../types/fruits";
import { Field } from "./Field";

interface Props {
  land: Square[];
  balance: number;
  onHarvest: (landIndex: number) => void;
  onPlant: (landIndex: number) => void;
  selectedItem: ActionableItem;
  fruits: FruitItem[];
}

export const FirstBlock: React.FC<Props> = ({
  fruits,
  land,
  balance,
  onHarvest,
  onPlant,
  selectedItem,
}) => {
  const [showWatering, setShowWatering] = React.useState(false);
  const hasRendered = React.useRef(false);
  React.useEffect(() => {
    if (land[0].fruit === Fruit.None) {
      setShowWatering(false);
    }

    // Only show it on first load
    if (!hasRendered.current && land[0].fruit !== Fruit.None) {
      setShowWatering(true);
    }
    if (balance) {
      hasRendered.current = true;
    }
  }, [land, balance]);

  React.useEffect(() => {
    const test = setInterval(() => {
      // 심어야됨.
      if (land[0].fruit === "0") onPlant(0);
      if (land[1].fruit === "0") onPlant(1);
      if (land[2].fruit === "0") onPlant(2);
      if (land[3].fruit === "0") onPlant(3);
      if (land[4].fruit === "0") onPlant(4);
      // 수확해야행~
      // if (land[0].fruit === "2") onHarvest(0);
      // if (land[1].fruit === "2") onHarvest(1);
      // if (land[2].fruit === "2") onHarvest(2);
      // if (land[3].fruit === "2") onHarvest(3);
      // if (land[4].fruit === "2") onHarvest(4);

      console.log("니가 심은 작물 리스트");
      console.log(land[0].fruit);
      console.log(land[1].fruit);
      console.log(land[2].fruit);
      console.log(land[3].fruit);
      console.log(land[4].fruit);
    }, 5000);
    return () => clearInterval(test);
  }, [land, onHarvest, onPlant]);

  return (
    <>
      <div
        className="top-edge"
        style={{ gridColumn: "7/8", gridRow: "6/7" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "8/9", gridRow: "6/7" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "9/10", gridRow: "6/7" }}
      />

      <div
        className="dirt"
        style={{ gridColumn: "7/8", gridRow: "7/8" }}
      />
      <div
        className="dirt"
        style={{ gridColumn: "9/10", gridRow: "7/8" }}
      />

      <div className="dirt" style={{ gridColumn: "9/10", gridRow: "8/9" }}>
        <Field
          fruits={fruits}
          balance={balance}
          selectedItem={selectedItem}
          square={land[3]}
          onClick={
            land[3].fruit === Fruit.None
              ? () => onPlant(3)
              : () => onHarvest(3)
          }
        />
      </div>
      <div className="dirt" style={{ gridColumn: "8/9", gridRow: "7/8" }}>
        {showWatering && <img id="watering" src={watering} />}
        <Field
          fruits={fruits}
          balance={balance}
          selectedItem={selectedItem}
          square={land[0]}
          onClick={
            land[0].fruit === Fruit.None
              ? () => onPlant(0)
              : () => onHarvest(0)
          }
        />
      </div>
      <div className="dirt" style={{ gridColumn: "8/9", gridRow: "9/10" }}>
        <Field
          fruits={fruits}
          balance={balance}
          selectedItem={selectedItem}
          square={land[4]}
          onClick={
            land[4].fruit === Fruit.None
              ? () => onPlant(4)
              : () => onHarvest(4)
          }
        />
      </div>
      <div
        id="first-sunflower"
        className="dirt"
        style={{ gridColumn: "8/9", gridRow: "8/9" }}
      >
        <Field
          fruits={fruits}
          balance={balance}
          selectedItem={selectedItem}
          square={land[2]}
          onClick={
            land[2].fruit === Fruit.None
              ? () => onPlant(2)
              : () => onHarvest(2)
          }
        />
      </div>

      <div className="dirt" style={{ gridColumn: "7/8", gridRow: "8/9" }}>
        <Field
          fruits={fruits}
          balance={balance}
          selectedItem={selectedItem}
          square={land[1]}
          onClick={
            land[1].fruit === Fruit.None
              ? () => onPlant(1)
              : () => onHarvest(1)
          }
        />
      </div>

      <div
        className="dirt"
        style={{ gridColumn: "7/8", gridRow: "9/10" }}
      />

      <div
        className="dirt"
        style={{ gridColumn: "9/10", gridRow: "9/10" }}
      />

      <div
        className="bottom-edge"
        style={{ gridColumn: "7/8", gridRow: "10/11" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "8/9", gridRow: "10/11" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "9/10", gridRow: "10/11" }}
      />

      <div
        className="left-edge"
        style={{ gridColumn: "6/7", gridRow: "7/8" }}
      />
      <div
        className="left-edge"
        style={{ gridColumn: "6/7", gridRow: "9/10" }}
      />

      <div
        className="right-edge"
        style={{ gridColumn: "10/11", gridRow: "7/8" }}
      />
      <div
        className="right-edge"
        style={{ gridColumn: "10/11", gridRow: "8/9" }}
      />
      <div
        className="right-edge"
        style={{ gridColumn: "10/11", gridRow: "9/10" }}
      />
    </>
  );
};
