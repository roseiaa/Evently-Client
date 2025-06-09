import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./sidebar";
import { getCurrentUser } from "../api/usersService";
import { message } from "antd";
import usersGlobalStore, { type usersStoreType } from "../store/users-store";
import Spinner from "../components/spinner";

function PrivateLayout({ children }: { children: React.ReactNode }) {
  const [displayContent, setDisplayContent] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setCurrentUser, currentUser }: usersStoreType =
    usersGlobalStore() as usersStoreType;

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getCurrentUser();
      setCurrentUser(response.data);
    } catch (error: any) {
      message.error(error.response?.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
    } else {
      getData();
      setDisplayContent(true);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    displayContent &&
    currentUser && (
      <div className="flex lg:flex-row flex-col gap-5 h-screen ">
        <Sidebar />
        <div className="flex-1  pb-3 lg:mt-10 px-5 overflow-y-scroll">{children}</div>
      </div>
    )
  );
}

export default PrivateLayout;
