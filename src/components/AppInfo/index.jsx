import React from "react";
import packagejson from "../../../package.json";

const AppInfo = () => {
  return (
    <>
      <div>IAC results viewer | version {packagejson.version}</div>
    </>
  );
};

export default AppInfo;
