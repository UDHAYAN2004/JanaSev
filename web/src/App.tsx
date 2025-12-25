import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import Home from "./pages/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/SignUp/SignUp";
import Footer from "./components/Footer/Footer";
import  SearchSchemes from "./pages/SearchSchemes/SearchSchemes";
import ViewProfile from "./components/ViewProfile/ViewProfile";
import Search from "./pages/SearchSchemes/Search";
import ViewSchemes from "./pages/ViewSchemes/ViewSchemes";

function App() {
  const location = useLocation();

  // Hide navbar on these paths
  const hideNavbarRoutes = ["/login", "/signup"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

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
      </Routes>
      {/* Footer */}
      <Footer/>
    </>
  );
}

export default App;
