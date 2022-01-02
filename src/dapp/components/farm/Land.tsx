import "./Land.css";

import React from "react";

import waterEdge from "../../images/water/edge.png";
import { ActionableItem, Fruit, Square } from "../../types/contract";
import { Inventory, Supply } from "../../types/crafting";
import { FruitItem } from "../../types/fruits";
import { Barn } from "./Barn";
import { Blacksmith } from "./Blacksmith";
import { Chickens } from "./Chickens";
import { FifthBlock } from "./FifthBlock";
import { FirstBlock } from "./FirstBlock";
import { FourthBlock } from "./FourthBlock";
import { Gold } from "./Gold";
import { Iron } from "./Iron";
import { Market } from "./Market";
import { Stones } from "./NewStone";
import { Trees } from "./NewTrees";
import { NFTs } from "./NFTs";
import { Reward } from "./Reward";
import { SecondLand } from "./SecondBlock";
import { ThirdBlock } from "./ThirdBlock";
import { Tiles } from "./Tiles";

interface Props {
  land: Square[];
  balance: number;
  onHarvest: (landIndex: number) => void;
  onPlant: (landIndex: number) => void;
  selectedItem: ActionableItem;
  fruits: FruitItem[];
  account?: string;
  inventory: Inventory;
  totalItemSupplies: Inventory;
}

const columns = Array(60).fill(null);
const rows = Array(20).fill(null);

export const Land: React.FC<Props> = ({
  fruits,
  land,
  balance,
  onHarvest,
  onPlant,
  selectedItem,
  account,
  inventory,
  totalItemSupplies,
}) => {
  return (
    <>
      {columns.map((_, column) =>
        rows.map((_, row) =>
          (column + row) % 2 ? null : (
            <div
              className="grass1"
              style={{
                position: "absolute",
                left: `calc(${(column - 25) * 62.5}px + 18px)`,
                top: `${row * 62.5}px`,
                width: "62.5px",
                height: "62.5px",
                background: "#5fc24b",
              }}
            />
          )
        )
      )}
      <div className="farm">
        <FirstBlock
          fruits={fruits}
          selectedItem={selectedItem}
          land={land}
          balance={balance}
          onHarvest={onHarvest}
          onPlant={onPlant}
        />
        <SecondLand
          fruits={fruits}
          selectedItem={selectedItem}
          land={land}
          balance={balance}
          onHarvest={onHarvest}
          onPlant={onPlant}
        />
        <ThirdBlock
          fruits={fruits}
          selectedItem={selectedItem}
          land={land}
          balance={balance}
          onHarvest={onHarvest}
          onPlant={onPlant}
        />
        <FourthBlock
          fruits={fruits}
          selectedItem={selectedItem}
          land={land}
          balance={balance}
          onHarvest={onHarvest}
          onPlant={onPlant}
        />
        <FifthBlock
          fruits={fruits}
          selectedItem={selectedItem}
          land={land}
          balance={balance}
          onHarvest={onHarvest}
          onPlant={onPlant}
        />

        <Trees inventory={inventory} />
        <Stones inventory={inventory} />
        <Iron inventory={inventory} />
        <Gold inventory={inventory} />

        <Chickens inventory={inventory} />
        <NFTs inventory={inventory} />

        <Barn farmSize={land.length} balance={balance} />
        <Blacksmith
          inventory={inventory}
          totalItemSupplies={totalItemSupplies}
          balance={balance}
        />
        <Market />
        <Tiles />
        <Reward account={account} />

        {/* {
                    land.map((square, index) => (
                        <Field square={square} onClick={square.fruit === Fruit.None ? () => onPlant(index) : () => onHarvest(index)}/> 
                    ))
                } */}
      </div>

      {/* Water */}
      {new Array(50).fill(null).map((_, index) => (
        <img
          className="water-edge"
          src={waterEdge}
          style={{
            position: "absolute",
            left: `${index * 62.5}px`,
          }}
        />
      ))}

      <div id="water" />
    </>
  );
};
