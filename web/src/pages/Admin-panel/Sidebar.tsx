import { Link } from "react-router-dom";
import sidebarimg from "../../assets/Admin-sidebar/sidebar.png";
import { RiDashboard2Fill } from "react-icons/ri";
import { IoMdAnalytics } from "react-icons/io";
import { CiViewList } from "react-icons/ci";

const Sidebar = () => {
  return (
    <div
      className="w-60 min-h-screen shadow-2xl bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${sidebarimg})` }}
    >
      <div className="flex justify-center text-lg text-white">
      <ul className="flex flex-col gap-5">
        <li className="flex items-center gap-2">
          <RiDashboard2Fill />
          <Link to='/admin/dashboard'>Dashboard</Link>
          
        </li>
        <li className="flex items-center gap-2">
          <IoMdAnalytics />
          <Link to='/admin/analytics'>Analytics</Link>
          
        </li>
        <li className="flex items-center gap-2">
          <CiViewList />
          <Link to='/admin/schemes'>Schemes</Link>
          
        </li>
      </ul>
      </div>
      
    </div>
  );
};

export default Sidebar;
