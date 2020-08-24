import React, { useContext } from "react";
import { Container } from "native-base";
//
import Context from "./Context";
//
function Contain({ children }) {
  //
  const {theme} = useContext(Context)  
  return (
    
      <Container style={{ backgroundColor: theme.bg }}>{children}</Container>
  );
}

export default Contain;
