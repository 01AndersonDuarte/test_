import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import Header from "../../components/Home/Header";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentValue = () => {
    if (location.pathname === "/") return 0;
    if (location.pathname === "/history") return 1;
    return 0;
  };

  const getPageName = () => {
    if (location.pathname === "/") return "Home";
    if (location.pathname === "/history") return "Histórico";

    return "Home";
  };

  const handleNavigation = (newValue: number) => {
    if (newValue === 0) navigate("/");
    if (newValue === 1) navigate("/history");
  };

  return (
    <div style={{ marginTop: "35px" }}>
      <Header pageName={getPageName()} />

      <div
        style={{
          width: "100%",
          paddingTop: "60px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Outlet />
        </div>

        <BottomNavigation
          value={getCurrentValue()}
          onChange={(_event, newValue) => handleNavigation(newValue)}
          style={{
            position: "fixed",
            bottom: 0,
            right: 0,
            left: 0,
            width: "100%",
            boxShadow: "0 -1px 5px rgba(0,0,0,0.2)",
          }}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Histórico" icon={<HistoryIcon />} />
        </BottomNavigation>
      </div>
    </div>
  );
}
