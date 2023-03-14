import React, { ChangeEvent } from "react";
import clsx from "clsx";
import Box from "@mui/material/Box";
import { ITile } from "../../models/board.model";

import hitImg from "../../assets/Hit.png";
import missImg from "../../assets/Miss.png";

import withResize from "../../hoc/withResize";

interface Props {
  tileState: ITile;
  windowInnerWidth: number;
  onTileClick: (t: ITile) => void;
}

const Tile = ({ tileState, windowInnerWidth, onTileClick }: Props) => {

  const getDynamicDimensions = (width: number): number => {
    if (width >= 1440) {
      return 76;
    } else if (width >= 1024 && width < 1440) {
      return 60;
    } else if (width >= 768 && width < 1024) {
      return 70;
    } else if (width >= 425 && width < 768) {
      return 36;
    } else {
      return 24;
    }
  }

  return (
    <Box
      sx={{
        width: getDynamicDimensions(windowInnerWidth),
        height: getDynamicDimensions(windowInnerWidth),
        border: "1px solid black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
          cursor: "pointer",
        },
      }}
      onClick={() => onTileClick(tileState)}
    >
      {tileState.isShip ? (
        <img src={hitImg} alt="hit" style={{ width: getDynamicDimensions(windowInnerWidth) }} />
      ) : tileState.isSelected ? (
        <img src={missImg} alt="hit" style={{ width: getDynamicDimensions(windowInnerWidth) }} />
      ) : null}
    </Box>
  );
};

export default withResize(Tile);
