import { Outlet } from "react-router-dom";

import LeftsideBar from "@/components/shared/leftside-bar";
import TopBar from "@/components/shared/top-bar";
import BottomBar from "@/components/shared/bottom-bar";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <TopBar />
      <LeftsideBar />

      <section className="flex flex-1 h-screen">
        <Outlet />
      </section>

      <BottomBar />
    </div>
  );
};

export default RootLayout;
