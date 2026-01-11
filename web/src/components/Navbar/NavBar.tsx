import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AUTH_APP_USER } from "../../utils";
import { setAppUser } from "../../pages/appReducers/appUserReducer";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const appUser = useSelector((state: any) => state.appUser);
  const dispatch = useDispatch();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_APP_USER);
    if (stored) {
      const parsed = JSON.parse(stored);
      dispatch(setAppUser(parsed));
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch]);

  const navbar = [
    { name: "Home", path: "/" },
    { name: "Search Schemes", path: "/search-schemes" },
    { name: "Recommended", path: "/recommended" },
  ];

  const handleLogout = () => {
    localStorage.removeItem(AUTH_APP_USER);
    window.location.reload();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-xl shadow-2xl border-b border-white/20" 
            : "bg-white/90 backdrop-blur-lg shadow-lg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Enhanced Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex shrink-0"
            >
              <Link to="/" className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute -inset-4 bg-linear-to-r from-blue-500 to-green-500 rounded-full opacity-10 blur-lg"></div>
                  <div className="text-3xl font-black bg-linear-to-r from-blue-600 to-green-600 bg-clip-text text-transparent relative">
                    Jana<span className="text-transparent bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text">Sev</span>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-2 h-2 bg-linear-to-r from-blue-500 to-green-500 rounded-full opacity-60"
                />
              </Link>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-12">
              <ul className="flex flex-row gap-12 text-lg font-semibold">
                {navbar.map((item, index) => (
                  <li key={item.name}>
                    <motion.div
                      className="relative"
                      onHoverStart={() => setHoveredItem(index)}
                      onHoverEnd={() => setHoveredItem(null)}
                    >
                      <Link 
                        to={item.path}
                        className={`relative px-4 py-2 transition-all duration-300 ${
                          location.pathname === item.path
                            ? "text-blue-600"
                            : "text-gray-700 hover:text-blue-600"
                        }`}
                      >
                        {item.name}
                        {location.pathname === item.path && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-blue-600 to-green-500 rounded-full"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </Link>
                      
                      {/* Hover Effect */}
                      <AnimatePresence>
                        {hoveredItem === index && location.pathname !== item.path && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-blue-400 to-green-400 rounded-full"
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </li>
                ))}
              </ul>

              {/* Enhanced Login / Logout Button - Desktop */}
              {appUser?.user?.id ? (
                <motion.div 
                  className="flex items-center gap-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  
                  
                  {/* Profile Button */}
                  <Link to="/View-profile">
                    <motion.button
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.4)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-3   hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg relative overflow-hidden group rounded-[50%]"
                    >
                      <div className="absolute inset-0 rounded-[50%] group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10 flex items-center gap-2 ">
                        <svg className="w-4 h-4 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          
                        </svg>
                        
                      </span>
                    </motion.button>
                  </Link>
                  
                  {/* Logout Button */}
                  <motion.button
                    onClick={handleLogout}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 25px -5px rgba(239, 68, 68, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-blue-500  text-white r  transition-all duration-300 font-semibold shadow-lg relative overflow-hidden group"
                  >
                    <div className="absolute inset-0  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </span>
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Link to="/login">
                    <motion.button
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.4)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 bg-blue-500 text-white  hover:from-blue-700 hover:to-green-700 transition-all duration-300 font-semibold shadow-lg relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-linear-to-r from-cyan-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10 flex items-center gap-2">
                        Login
                        <motion.svg
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </motion.svg>
                      </span>
                    </motion.button>
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Enhanced Mobile menu button */}
            <div className="lg:hidden flex items-center gap-4">
              {appUser?.user?.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-8 h-8 bg-linear-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
                >
                  {appUser.user.name?.charAt(0) || "U"}
                </motion.div>
              )}
              
              <motion.button
                onClick={toggleMenu}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="inline-flex items-center justify-center p-3 rounded-2xl text-gray-700 hover:text-blue-600 hover:bg-linear-to-r hover:from-blue-50 hover:to-green-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {/* Enhanced Hamburger icon */}
                <div className="w-6 h-6 flex flex-col justify-center items-center relative">
                  <motion.span
                    animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: -4 }}
                    className="block w-6 h-0.5 bg-current absolute transition-all duration-300"
                  />
                  <motion.span
                    animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="block w-6 h-0.5 bg-current absolute transition-all duration-300"
                  />
                  <motion.span
                    animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 4 }}
                    className="block w-6 h-0.5 bg-current absolute transition-all duration-300"
                  />
                </div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-white/20"
            >
              <div className="px-4 pt-4 pb-8 space-y-2">
                {/* Mobile Navigation Links */}
                <ul className="flex flex-col space-y-2">
                  {navbar.map((item, index) => (
                    <motion.li
                      key={item.name}
                      variants={itemVariants}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block py-4 px-6 text-lg font-semibold rounded-2xl transition-all duration-300 ${
                          location.pathname === item.path
                            ? "bg-linear-to-r from-blue-500 to-green-500 text-white shadow-lg"
                            : "text-gray-700 hover:bg-linear-to-r hover:from-blue-50 hover:to-green-50 hover:text-blue-600"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                {/* Mobile Profile & Login/Logout Buttons */}
                <motion.div
                  variants={itemVariants}
                  transition={{ delay: 0.3 }}
                  className="pt-6 border-t border-gray-200/50 space-y-3"
                >
                  {appUser?.user?.id ? (
                    <>
                      {/* Profile Button - Mobile */}
                      <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          className="w-full py-4 px-6 bg-linear-to-r from-purple-600 to-indigo-600 text-white rounded-2xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Update Profile
                        </motion.button>
                      </Link>
                      
                      {/* Logout Button - Mobile */}
                      <motion.button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-4 px-6 bg-linear-to-r from-red-600 to-red-700 text-white rounded-2xl hover:from-red-700 hover:to-red-800 transition-all duration-300 font-semibold shadow-lg flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </motion.button>
                    </>
                  ) : (
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-4 px-6 bg-linear-to-r from-blue-600 to-green-600 text-white rounded-2xl hover:from-blue-700 hover:to-green-700 transition-all duration-300 font-semibold shadow-lg"
                      >
                        Login
                      </motion.button>
                    </Link>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Enhanced Overlay for mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Add spacing for fixed nav */}
      <div className="h-20"></div>
    </>
  );
};

export default NavBar;