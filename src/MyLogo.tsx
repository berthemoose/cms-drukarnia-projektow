import React from "react";
import logo from "./assets/logo.png";

const MyLogo = () => (
  <div style={{display: "flex", gap:"1rem", flexDirection:"column", justifyItems:"center", alignItems:"center" }}>
    <img
      src={logo}
      alt="K2 Drukarnia Projektow 2"
      style={{ width: "auto", height: "120px" }}
    />
    <span style={{fontSize:"2rem", marginTop:"6px", fontFamily:"Arial", fontWeight:"bold"}}>PANEL K2-CMS</span>
    <span style={{textAlign:"center"}}>Witaj w Panelu K2-Content-Management-System, z poziomu którego możesz edytować treść strony, ofertę eSklepu i zarządzać uprawnieniami użytkowników.</span>
  </div>
);

export default MyLogo;