import React from "react";
import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
  return (
      <RotatingLines
        strokeColor="Black"
        strokeWidth="5"
        animationDuration="1"
        width="20"
        visible={true}
      />
    // </div>
  );
};

export default Loader;
