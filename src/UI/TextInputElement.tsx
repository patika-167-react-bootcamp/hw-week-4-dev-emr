import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CheckIcon from "@mui/icons-material/Check";
import ClassIcon from "@mui/icons-material/Class";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

interface props {
  inputMsg: string;
  width: string;
  textIcon: string;
  name: string;
}

export default function TextInputElement(props: props) {
  const iconCheck = () => {
    if (props.textIcon === "CheckIcon") {
      return <CheckIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />;
    }
    if (props.textIcon === "ClassIcon") {
      return <ClassIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />;
    }
    if (props.textIcon === "StatusIcon") {
      return <MoreHorizIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />;
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "flex-end", width: "auto" }}>
      {iconCheck()}
      <TextField
        id="input-with-sx"
        label={props.inputMsg}
        variant="standard"
        sx={{ width: `${props.width}` }}
        name={props.name}
      />
    </Box>
  );
}
