import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Arrow = (props) => (
  <Svg
    width={17}
    height={16}
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M1.5 8H15.5M15.5 8L8.5 1M15.5 8L8.5 15"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Arrow;
