// DOCUMENT NOT IN USE AT THE MOMENT

import React, { useState, useEffect } from "react";
import ColorButton from "../material-ui/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { grey } from "@material-ui/core/colors";

const DeleteInfoCard = (props) => {
  const [clickDelete, setClickDelete] = useState(false);

  return (
    <div>
      <ColorButton
        onClick={() => setClickDelete(true)}
        style={{ background: "black" }}
        startIcon={<DeleteIcon />}
      />
    </div>
  );
};

export default DeleteInfoCard;
