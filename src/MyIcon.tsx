import React from "react";
import icon from "./assets/logo.png"

const MyIcon = () => (
  <div style={{display: "flex", gap:"1rem", flexDirection:"row", justifyItems:"center", alignItems:"center" }}>
    <img
      src={icon}
      alt="K2 Drukarnia Projektow"
      style={{ width: "auto", height: "40px" }}
    />
    <div style={{display:"flex", justifyItems:"center", alignItems:"center", margin:"0px"}}>
    <span style={{fontSize:"2rem", fontFamily:"Arial", fontWeight:"bold"}}>PANEL K2-CMS</span>
    </div>
  </div>
);


export default MyIcon;