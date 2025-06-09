import {
  BookCheck,
  House,
  List,
  LogOut,
  User,
  UsersRound,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { message } from "antd";
import type { usersStoreType } from "../../store/users-store";
import usersGlobalStore from "../../store/users-store";

function MenuItems() {
  const iconSize = 20;
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const {currentUser}:usersStoreType = usersGlobalStore() as usersStoreType;
  const userMenu = [
    {
      name: "Home",
      link: "/",
      icon: <House size={iconSize} />,
      isActive: currentPath === "/" || currentPath.includes("/events"),
    },
    {
      name: "Profile",
      link: "/profile",
      icon: <User size={iconSize} />,
      isActive: currentPath === "/profile",
    },
    {
      name: "Bookings",
      link: "/profile/bookings",
      icon: <List size={iconSize} />,
      isActive: currentPath === "/profile/bookings",
    },
 
    {
      name: "Logout",
      link: "/logout",
      icon: <LogOut size={iconSize} />,
    },
  ];
  const staffMenu = [
    {
      name: "Home",
      link: "/",
      icon: <House size={iconSize} />,
      isActive: currentPath === "/" ,
    },
    {
      name: " Manage Events",
      link: "/admin/events",
      icon: <List size={iconSize} />,
      isActive: currentPath.includes("/events"),
    },
    {
      name: "My Bookings",
      link: "/profile/bookings",
      icon: <User size={iconSize} />,
      isActive: currentPath === "/profile/bookings",
    },
    {
      name: "Bookings",
      link: "/admin/bookings",
      icon: <BookCheck size={iconSize} />,
      isActive: currentPath.includes("/admin/bookings"),
    },
    {
      name: "Users",
      link: "/admin/users",
      icon: <UsersRound size={iconSize} />,
      isActive: currentPath.includes("/admin/users"),
    },
    {
      name: "Logout",
      link: "/logout",
      icon: <LogOut size={iconSize} />,
    },
  ];

  const onLogout = () => {
    Cookies.remove("token");
    navigate("/login");
    message.success("Logged out successfully");
  };

  const menuRender = currentUser?.isStaff ? staffMenu : userMenu;
  return (
    <div className="lg:bg-gray-200 w-full h-full p-5">
      <div className="flex flex-col gap-1 mt-5 px-8">
        <h1 className="text-4xl font-semibold evently  text-titles">Evently</h1>
        <span className="text-sm  text-gray-600">{currentUser?.name}</span>
      </div>

      <div className="flex flex-col gap-10 mt-20">
        {menuRender.map((item) => (
          <div
            key={item.name}
            onClick={() => {
              if (item.name === "Logout") {
                onLogout();
              } else {
                navigate(item.link);
              }
            }}
            className={`cursor-pointer px-5 py-3 rounded flex gap-6 text-sm items-center ${
              item.isActive ? `bg-titles text-white` : ``
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuItems;
