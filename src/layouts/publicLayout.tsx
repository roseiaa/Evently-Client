import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

function PublicLayout({ children }: { children: React.ReactNode }) {
    const [displayContent, setDisplayContent] = useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      navigate("/");
    }
    else {
        setDisplayContent(true)
    }
  }, []);
  return displayContent && <div>{children}</div>;
}

export default PublicLayout;
