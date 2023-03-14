import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { cloneDeep } from "lodash";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { IShipLayout, ITile, TileCoordinates } from "../../models/board.model";
import Tile from "../tile/Tile";
import TileBoard from "../grid/Grid";
import Ships from "../ships/Ships";

import aircraftImg from "../../assets/Aircraft.png";
import battleshipImg from "../../assets/Battleship.png";
import carrierImg from "../../assets/Carrier.png";
import cruiserImg from "../../assets/Cruiser.png";
import submarineImg from "../../assets/Submarine.png";

import withResize from "../../hoc/withResize";

interface Props {
  windowInnerWidth: number;
}

const GameBoard = ({ windowInnerWidth }: Props) => {
  const shipTypes = {
    carrier: { size: 5, count: 1 },
    battleship: { size: 4, count: 1 },
    cruiser: { size: 3, count: 1 },
    submarine: { size: 3, count: 1 },
    destroyer: { size: 2, count: 1 },
  };

  const getDynamicDimensions = (width: number): number => {
    if (width >= 1440) {
      return 360;
    } else if (width >= 1024 && width < 1440) {
      return 240;
    } else if (width >= 768 && width < 1024) {
      return 240;
    } else if (width >= 425 && width < 768) {
      return 160;
    } else {
      return 120;
    }
  };

  const initialShiplayout = [
    {
      ship: "destroyer",
      image: (
        <img
          src={aircraftImg}
          alt="destroyer"
          style={{ width: getDynamicDimensions(windowInnerWidth) }}
        />
      ),

      positions: [
        { isHit: false, coordinates: { x: 2, y: 9 } },
        { isHit: false, coordinates: { x: 3, y: 9 } },
        { isHit: false, coordinates: { x: 4, y: 9 } },
        { isHit: false, coordinates: { x: 5, y: 9 } },
        { isHit: false, coordinates: { x: 6, y: 9 } },
      ],
    },
    {
      ship: "battleship",
      image: (
        <img
          src={battleshipImg}
          alt="battleship"
          style={{ width: getDynamicDimensions(windowInnerWidth) }}
        />
      ),
      positions: [
        { isHit: false, coordinates: { x: 5, y: 2 } },
        { isHit: false, coordinates: { x: 5, y: 3 } },
        { isHit: false, coordinates: { x: 5, y: 4 } },
        { isHit: false, coordinates: { x: 5, y: 5 } },
      ],
    },
    {
      ship: "cruiser",
      image: (
        <img
          src={cruiserImg}
          alt="cruiser"
          style={{ width: getDynamicDimensions(windowInnerWidth) }}
        />
      ),
      positions: [
        { isHit: false, coordinates: { x: 8, y: 1 } },
        { isHit: false, coordinates: { x: 8, y: 2 } },
        { isHit: false, coordinates: { x: 8, y: 3 } },
      ],
    },
    {
      ship: "submarine",
      image: (
        <img
          src={submarineImg}
          alt="submarine"
          style={{ width: getDynamicDimensions(windowInnerWidth) }}
        />
      ),
      positions: [
        { isHit: false, coordinates: { x: 3, y: 0 } },
        { isHit: false, coordinates: { x: 3, y: 1 } },
        { isHit: false, coordinates: { x: 3, y: 2 } },
      ],
    },
    {
      ship: "carrier",
      image: (
        <img
          src={carrierImg}
          alt="carrier"
          style={{ width: getDynamicDimensions(windowInnerWidth) }}
        />
      ),
      positions: [
        { isHit: false, coordinates: { x: 0, y: 0 } },
        { isHit: false, coordinates: { x: 0, y: 1 } },
      ],
    },
  ];

  const boardSize = 10;
  const [board, setBoard] = useState<ITile[][]>([]);

  const [shipLayout, setShipLayout] =
    useState<IShipLayout[]>(initialShiplayout);

  useEffect(() => {
    initializeBoard();
  }, []);

  const initializeBoard = () => {
    let emptyBoard = [] as ITile[][];

    for (let x = 0; x < boardSize; x++) {
      emptyBoard.push([] as ITile[]);
      for (let y = 0; y < boardSize; y++) {
        emptyBoard[x].push({
          isSelected: false,
          isShip: false,
          coordinates: {
            x: x,
            y: y,
          },
        } as ITile);
      }
    }

    setBoard(emptyBoard);
  };

  const compareCoordinates = (
    firstCoords: TileCoordinates,
    secondCoords: TileCoordinates
  ) => {
    return firstCoords.x === secondCoords.x && firstCoords.y === secondCoords.y;
  };

  const handleTileClick = (t: ITile) => {
    t.isSelected = !t.isSelected ? !t.isSelected : t.isSelected;

    const boardCopy = cloneDeep(board);
    const shipLayoutCopy = cloneDeep(shipLayout);

    const sLIndex = shipLayoutCopy.findIndex(
      (sL) =>
        sL.positions.findIndex((p) =>
          compareCoordinates(p.coordinates, t.coordinates)
        ) !== -1
    );

    const shipHit = !!(sLIndex !== -1);
    t.isShip = shipHit;

    if (shipHit) {
      const ship = shipLayoutCopy[sLIndex];
      const pIndex = ship.positions.findIndex((p) =>
        compareCoordinates(p.coordinates, t.coordinates)
      );
      if (pIndex !== -1) {
        ship.positions[pIndex].isHit = !ship.positions[pIndex].isHit
          ? !ship.positions[pIndex].isHit
          : ship.positions[pIndex].isHit;
      }
    }

    const rowIndex = boardCopy.findIndex(
      (row) =>
        row.findIndex((tile) =>
          compareCoordinates(tile.coordinates, t.coordinates)
        ) !== -1
    );
    if (rowIndex !== -1) {
      const row = boardCopy[rowIndex];
      const tileIndex = row.findIndex((tile) =>
        compareCoordinates(tile.coordinates, t.coordinates)
      );
      if (tileIndex !== -1) {
        row[tileIndex] = t;
      }
    }

    setBoard(boardCopy);
    setShipLayout(shipLayoutCopy);
  };

  return (
    <div style={{ maxWidth: 1440, margin: "0 auto", padding: "16px" }}>
      {windowInnerWidth >= 769 ? (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4} lg={4}>
              <Ships
                shipLayout={shipLayout}
              />
            </Grid>
            <Grid
              container
              item
              xs={12}
              md={8}
              lg={8}
              justifyContent="center"
              alignItems="flex-start"
            >
              <TileBoard board={board} onTileClick={handleTileClick} />
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid
              container
              item
              xs={12}
              md={8}
              lg={8}
              justifyContent="center"
              alignItems="flex-start"
            >
              <TileBoard board={board} onTileClick={handleTileClick} />
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Ships
                shipLayout={shipLayout}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
};

export default withResize(GameBoard);
