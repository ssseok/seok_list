import React from "react";
import styled from "styled-components";
// → 패키지 import

import { Eco } from "@material-ui/icons";
// → 머테리얼 UI import

// ** 자식 컴포넌트 (Spinner)
const Spinner = (props) => {
  return (
    <Outter>
      <Eco style={{ color: "white", fontSize: "150px" }} />
    </Outter>
  );
};

// styled-components
const Outter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #b0c4de;
`;

export default Spinner;
