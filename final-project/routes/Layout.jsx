import { Outlet } from "react-router-dom";
import Navbar from "../src/components/Navbar/Navbar"; // Adjust the import path as necessary

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet /> {/* This will render the matched route's component */}
    </>
  );
};

export default Layout;
