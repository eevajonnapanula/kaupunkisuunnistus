import React, { FunctionComponent } from "react";

interface LoadingProps {
  visible: boolean;
}

const Loading: FunctionComponent<LoadingProps> = ({ visible }) => (
  <div
    className={`loader ${visible ? "" : "hide"}`}
    aria-label="Loading..."
  ></div>
);

export default Loading;
