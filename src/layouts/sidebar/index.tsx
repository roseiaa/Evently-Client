import { useState } from "react";
import MenuItems from "./MenuItems";

import { Menu } from "lucide-react";
import { Drawer } from "antd";

function Sidebar() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div>
      <div className="lg:flex hidden lg:w-60 h-full">
        <MenuItems />
      </div>

      <div className="bg-titles p-5 lg:hidden flex">
        <Menu
          className="cursor-pointer"
          size={30}
          color="white"
          onClick={() => setShowMenu(!showMenu)}
        />
      </div>

      {showMenu && (
        <Drawer
          open={showMenu}
          placement="left"
          onClose={() => setShowMenu(false)}
        >
          <MenuItems  />
        </Drawer>
      )}
    </div>
  );
}

export default Sidebar;
