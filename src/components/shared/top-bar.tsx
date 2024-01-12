import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/auth-context";

const TopBar = () => {
  const { mutate: signOutAccount, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
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
    <section className="sticky top-0 z-50 md:hidden bg-slate-900 w-full">
      <div className="flex justify-between items-center pt-2 px-3">
        <Link to="/">
          <div className="flex items-center p-2 text-white mb-3">
            <img src="/assets/images/logo.jpg" className="mr-1 w-7 h-7" />
            <span className="text-2xl font-bold"> Bemgram</span>
          </div>
        </Link>

        <div className="flex gap-0">
          <Button
            onClick={logoutHandler}
            variant="ghost"
            className="hover:bg-slate-900 hover:text-orange-300"
          >
            <LogOut className="w-4 h-4" />
          </Button>

          <Link
            to={`/profile/${user.id}`}
            className="flex items-center justify-center gap-3"
          >
            <img
              src={user.imageUrl}
              alt="profile img"
              className="rounded-full w-8 h-8"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopBar;
