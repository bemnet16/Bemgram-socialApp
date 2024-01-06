import { bottombarLinks } from "@/constants";
import { Link, useLocation } from "react-router-dom";

const BottomBar = () => {
  const { pathname } = useLocation();
  return (
    <section className="z-50 flex justify-between w-full sticky bottom-0 rounded-t-[20px] bg-dark-2 px-4 py-2 md:hidden bg-[#0f1113] border border-slate-500 border-t-2">
      {bottombarLinks.map(({ icon: Icon, label, route }, idx) => {
        const isActive = pathname === route;
        return (
          <Link
            to={route}
            className={` flex flex-col gap-0 px-4 py-1 items-center hover:text-white rounded-lg text-[16px] font-medium leading-[140%] hover:bg-indigo-600  transition-all ${
              isActive && "bg-indigo-600"
            }`}
            key={idx}
          >
            <Icon className="text-indigo-300 h-5 w-5" />
            <p className="text-xs">{label} </p>
          </Link>
        );
      })}
    </section>
  );
};

export default BottomBar;
