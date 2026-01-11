import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import Home from "./pages/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/SignUp/SignUp";
import Footer from "./components/Footer/Footer";
import ViewProfile from "./components/ViewProfile/ViewProfile";
import Search from "./pages/SearchSchemes/Search";
import ViewSchemes from "./pages/ViewSchemes/ViewSchemes";
import { useSelector } from "react-redux";
import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./pages/Admin-panel/Layout";
import { Dashboard } from "./pages/Admin-panel/Admin_layout/Dashboard";
function App() {
  const appUser = useSelector((state: any) => state.appUser);
  const location = useLocation();
  const role=useSelector((state:any)=>state.appUser.user?.role);
  const Navigate=useNavigate();
  // Hide navbar on these paths

  const shouldHideNavbar = location. pathname === "/login" ||
                           location.pathname === "/signup" ||
                           location.pathname .startsWith("/admin")
  return (
    <>
      {/* Navbar (only visible when not in login/signup) */}
      {!shouldHideNavbar && <NavBar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search-schemes" element={<Search/>}/>
        <Route path="/View-profile" element={<ViewProfile/>}/>
        <Route path="/schemes/:id" element={<ViewSchemes/>}/>

         {/*Admin Routes*/}
         <Route path='/admin/*' element={<Layout/>}>
           <Route path='dashboard' element={<Dashboard/>}/>
         </Route>
        
      </Routes>
      
         
     
     
      {/* Footer */}
      <Footer/>
    </>
  );
}

export default App;
