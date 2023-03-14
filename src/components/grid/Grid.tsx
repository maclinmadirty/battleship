import React from "react";


import {  ITile } from "../../models/board.model";
import Tile from "../tile/Tile";

interface Props {
  board: ITile[][];
  onTileClick: (t: ITile) => void;
}

const TileBoard = ({board, onTileClick}: Props) => {
  return (
    <div>
      {board.map((row, rowI) => (
        <div key={`row-${rowI}`} style={{ display: "flex" }}>
          {row.map((t, tileI) => (
            <Tile
              key={`tile-${rowI}-${tileI}`}
              tileState={t}
              onTileClick={onTileClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TileBoard;
