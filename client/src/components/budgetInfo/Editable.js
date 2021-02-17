import React, { useState } from "react";

const Editable = ({ text, type, placeholder, children, ...props }) => {
  const [isEditing, setEditing] = useState(false);

  return (
    <section {...props}>
      {isEditing ? (
        <div onBlur={() => setEditing(false)}>{children}</div>
      ) : (
        <div onClick={() => setEditing(true)}>
          <span>{text}</span>
        </div>
      )}
    </section>
  );
};

export default Editable;
