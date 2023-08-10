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
import axios from 'axios'

const AdminDashboard = ({ isAdminLoggedIn,adminData,setAdminData,setIsAdminLoggedIn,setShowNav}) => {
  const [riders, setRiders] = useState([]);
  const [users,setUsers] = useState([])
  const [orders,setOrders]  = useState([])
  const [products,setProducts]  = useState([])
 
  const navigate = useNavigate();

  const handleAddRider = (newRider) => {
    setRiders([...riders, newRider]);
  };

  const handleRemoveRider = (riderId) => {
    setRiders(riders.filter((rider) => rider.id !== riderId));
  };

   function handleDeleteuser(id) {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  }


//   useEffect(() => {
//        // Check if adminData exists in local storage
//     const storedAdminData = localStorage.getItem("adminData");
//     if (storedAdminData) {
//       const adminDataFromStorage = JSON.parse(storedAdminData);
//       setAdminData(adminDataFromStorage);
//       setIsAdminLoggedIn(true);
//       setShowNav(true);
//   } 
// },[]);
useEffect(() => {
    const token = localStorage.getItem("jwt");

    const url = "https://eazy-bazaar-ecommerce-app.onrender.com/api/v1/profile"
    const config =  {
      headers: {
    Authorization: `Bearer ${token}`,
  }
}
    // Fetch user data with image from the backend when the component mounts
    axios.get(url,config)
      .then(response => {
        // The data is in the response.data.results array
        setAdminData(response.data.user);
      setIsAdminLoggedIn(true);
      setShowNav(true);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);
  useEffect(() => {
  const urls = [ 
    "https://eazy-bazaar-ecommerce-app.onrender.com//api/v1/users",
    "https://eazy-bazaar-ecommerce-app.onrender.com//riders",
    "https://eazy-bazaar-ecommerce-app.onrender.com//api/v1/users/orders_sorted",
    "https://eazy-bazaar-ecommerce-app.onrender.com//products"
  ];

  Promise.all(urls.map(url => axios.get(url)))
    .then(responses => {
      const [usersResponse, ridersResponse, ordersResponse, productsResponse] = responses;
      const users = usersResponse.data;
      const riders = ridersResponse.data;
      const orders = ordersResponse.data;
      const products = productsResponse.data;

      console.log(users, riders, orders, products);
      setRiders(riders)
      setUsers(users)
      setOrders(orders)
      setProducts(products)

    })
    .catch(error => {
      console.error('Error fetching data:', error);
      
    });
}, []);

const storedAdminData = localStorage.getItem("adminData")

  return (
    <CssVarsProvider>
      {storedAdminData ? <main>
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
            onClick={function () {
              localStorage.removeItem('adminData')
              navigate("/login", { replace: true });
            }}
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
            <Users users={users} onDeleteUser={handleDeleteuser}/>
          </TabPanel>
          <TabPanel value={1}></TabPanel>
          <TabPanel value={2}></TabPanel>
          <TabPanel value={3}></TabPanel>
        </Tabs>
      </main> : null}
    </CssVarsProvider>
  );
};

export default AdminDashboard;
