import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/auth-context";
import { sidebarLinks } from "@/constants";

const LeftsideBar = () => {
  const { mutate: signOutAccount, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);

  const logoutHandler = () => {
    signOutAccount()
    navigate("/")
  }

  return (
    <nav className="hidden md:flex px-4 py-7 flex-col justify-between min-w-[270px] bg-gray-950">
      <div className="flex flex-col gap-11 ">
        <Link to="/" className="flex gap-3 items-center">
          <div className="flex items-center p-2 text-white mb-3">
            <img src="/assets/images/logo.jpg" className="mr-1 w-7 h-7" />
            <span className="text-2xl font-bold"> Bemgram</span>
          </div>
        </Link>

        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={user.imageUrl}
            alt="profile img"
            className="w-14 h-14 rounded-full"
          />

          <div className="flex flex-col">
            <p className="text-[18px] font-bold leading-[140%]">{user.name}</p>
            <p className="text-xs text-gray-400">@{user.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-3">
          {sidebarLinks.map(({ icon: Icon, label, route }, idx) => {
            const isActive = pathname === route;
            return (
              <li
                className={`rounded-lg text-[16px] font-medium leading-[140%] hover:bg-indigo-600  transition ${
                  isActive && "bg-indigo-600"
                }`}
                key={idx}
              >
                <NavLink
                  to={route}
                  className="flex gap-4 p-3 items-center hover:text-white"
                >
                  <Icon className="text-indigo-300" />
                  <p>{label} </p>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        onClick={logoutHandler}
        variant="ghost"
        className=" flex justify-start items-center text-white   hover:bg-gray-950 hover:text-orange-300"
      >
        <LogOut className="w-6 h-6 mr-2 text-indigo-500" />
        <span>Logout</span>
      </Button>
    </nav>
  );
};

export default LeftsideBar;
