import React, { useState } from "react";

const SaveButton = () => {
  const [clicked, setClicked] = useState(false);
  const onClickHandler = () => setClicked(!clicked);
  return (
    <div>
      {clicked ? (
        <img
          src="https://cdn-icons-png.flaticon.com/128/102/102279.png"
          onClick={onClickHandler}
        />
      ) : (
        <img
          src="https://cdn-icons-png.flaticon.com/128/5662/5662990.png"
          onClick={onClickHandler}
        />
      )}
    </div>
  );
};

export default SaveButton;
