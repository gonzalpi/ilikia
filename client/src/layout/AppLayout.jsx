import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import { MainScreenAdmin } from "../mainScreen/MainScreenAdmin";
import {

    BrowserRouter as Router,
    Route,
    Routes,
    Link
  
  } from "react-router-dom";

const AppLayout = () => {
    return <div style={{
        padding: '50px 0px 0px 350px'
    }}>
        <Sidebar />
        {/* <MainScreenAdmin></MainScreenAdmin> */}
        <Outlet />
        
    </div>;
};

export default AppLayout;
