// AdminDashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet/Sheet";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import IconButton from "@mui/joy/IconButton";
import Users from "./Users/Users";

const AdminDashboard = ({ isAdminLoggedIn }) => {
  const [riders, setRiders] = useState([
    { id: 1, name: "Rider 1" },
    { id: 2, name: "Rider 2" },
    // Add other initial riders here
  ]);

  const navigate = useNavigate();

  const handleAddRider = (newRider) => {
    setRiders([...riders, newRider]);
  };

  const handleRemoveRider = (riderId) => {
    setRiders(riders.filter((rider) => rider.id !== riderId));
  };

  useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate("/admin/login", { replace: true });
    }
  }, [isAdminLoggedIn]);

  return (
    <CssVarsProvider>
      <main>
        <Sheet
          sx={{
            width: "100%",
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: "flex",
            flexDirection: "row",
          }}
          variant="soft"
        >
          <Typography>EAZY BAZAAR</Typography>
          <IconButton
            sx={{ marginInlineStart: "auto" }}
            variant="plain"
            color="danger"
            onClick={function () {}}
          >
            <LogoutOutlined />
          </IconButton>
        </Sheet>
        <Tabs size="lg" variant="soft" default={0}>
          <TabList>
            <Tab color="primary" value={0}>
              Users
            </Tab>
            <Tab color="primary" value={1}>
              Products
            </Tab>
            <Tab color="primary" value={2}>
              Riders
            </Tab>
            <Tab color="primary" value={3}>
              Orders
            </Tab>
          </TabList>
          <TabPanel
            sx={{
              padding: 0,
              margin: 0,
            }}
            value={0}
          >
            <Users />
          </TabPanel>
          <TabPanel value={1}></TabPanel>
          <TabPanel value={2}></TabPanel>
          <TabPanel value={3}></TabPanel>
        </Tabs>
      </main>
    </CssVarsProvider>
  );
};

export default AdminDashboard;
