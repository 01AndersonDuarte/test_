import { Typography } from "@mui/material";
import logo from "../../assets/logo.png";
import logoPreview from "../../assets/logoPreview.png";
import { useEffect, useState } from "react";

export default function Header({ pageName }: { pageName: string }) {
  const [isToShowLogoPreview, setIsToShowLogoPreview] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 800) {
        setIsToShowLogoPreview(true);
      } else {
        setIsToShowLogoPreview(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      style={{
        width: "100%",
        minHeight: "50px",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        backgroundColor: "#fff",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ flex: 1, marginLeft: "10px" }}>
        <Typography
          variant="h5"
          component="h1"
          style={{
            fontFamily: "'Roboto Slab', serif",
            color: "#000",
          }}
        >
          {pageName}
        </Typography>
      </div>

      {isToShowLogoPreview ? (
        <div style={{ marginRight: "10px" }}>
          <img
            alt="Logo-Preview"
            src={logoPreview}
            style={{
              height: "50px",
              width: "50px",
            }}
          />
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            width: "50%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            alt="Logo"
            src={logo}
            style={{
              height: "auto",
              width: "35%",
            }}
          />
        </div>
      )}
    </header>
  );
}
