import { Grid } from "@mui/material";
import Sidebar from "./components/sidebar";
import Topbar from "./components/topbar";
import Customers from "./components/customers";
import { Route, Routes } from "react-router-dom";
import Products from "./components/products";
import Categories from "./components/categories";

const AdminPage = () => {
  return (
    <Grid container>
      <Grid item xs={12} md={3}>
        <Sidebar />
      </Grid>
      <Grid item xs={12} md={3}>
        <Topbar />
      </Grid>
      <Grid item xs={12} md={24}>
        <Routes>
          <Route path="customers" element={<Customers />} />
          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<Products />} />
        </Routes>
      </Grid>
    </Grid>
  );
};

export default AdminPage;
