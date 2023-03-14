import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { IShipLayout, IShipPosition, ITile } from "../../models/board.model";
import hitSmallImg from "../../assets/Hitsmall.png";
import missSmallImg from "../../assets/Misssmall.png";

interface Props {
  shipLayout: IShipLayout[];
  windowInnerWidth: number;
}

const Ships = ({ shipLayout, windowInnerWidth }: Props) => {
  return (
    <div>
      <div style={{ display: "flex", height: "260px", marginBottom: "16px" }}>
        <Box
          sx={{
            flex: 1,
            height: "100%",
            backgroundColor: "orange",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h3" gutterBottom>
            00
          </Typography>
          <Divider variant="middle" />
          <Typography variant="h4" gutterBottom>
            player 1
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            height: "100%",
            backgroundColor: "green",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h3" gutterBottom>
            00
          </Typography>
          <Divider variant="middle" />
          <Typography variant="h4" gutterBottom>
            player 2
          </Typography>
        </Box>
      </div>
      <div style={{display: "flex", flexDirection: windowInnerWidth >= 769 ? "column" : "row", flexWrap: windowInnerWidth >= 769 ? "nowrap" : "wrap" }}>
      {shipLayout.map((s: IShipLayout) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1
          }}
        >
          <div>{s.image}</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {s.positions.map((p: IShipPosition) => (
              <img
                src={p.isHit ? hitSmallImg : missSmallImg}
                alt="a"
                style={{ width: 20 }}
              />
            ))}
          </div>
        </div>
      ))}
      </div>

    </div>
  );
};

export default Ships;
