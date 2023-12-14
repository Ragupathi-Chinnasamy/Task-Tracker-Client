import { Menu } from "@mantine/core";
import { IconUserBolt, IconLogout } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { TabHeader } from ".";

function Header() {
  const navigate = useNavigate();
  const firstName = localStorage.getItem("firstName") ?? "None";
  const lastName = localStorage.getItem("lastName") ?? "None";
  const email = localStorage.getItem("email") ?? "None";

  const onClickLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-10 shadow-md">
      <section className="flex justify-between items-center px-20 py-2 bg-gray-100/90">
        <div
          className="text-3xl font-extrabold tracking-wide leading-10 bg-gradient-to-tl from-teal-700 to-purple-800 text-transparent bg-clip-text cursor-pointer active:scale-95"
          onClick={() => navigate("/dashboard")}
        >
          Todo-Tracker
        </div>
        <Menu position="bottom">
          <Menu.Target>
            <div className="cursor-pointer active:scale-95 flex items-center gap-2 border border-solid border-gray-500/30 rounded-md py-1 px-2 bg-white/60">
              <div>
                <IconUserBolt size={34} />
              </div>
              <div className="flex flex-col">
                <div>
                  {firstName} {lastName}
                </div>
                <div className="text-gray-600">{email}</div>
              </div>
            </div>
          </Menu.Target>
          <Menu.Dropdown className="border border-solid border-gray-500/30">
            <Menu.Item
              leftSection={<IconLogout />}
              onClick={onClickLogout}
              className="px-5"
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </section>
      <TabHeader />
    </header>
  );
}

export default Header;
