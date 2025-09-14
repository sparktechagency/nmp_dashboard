/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type TProps = {
  menuItem: {
    icon: any;
    label: string;
    path?: string;
    hasArrow?: boolean;
    children?: any[];
  };
  closeSidebar: () => void;
};

const SidebarLink = ({ menuItem, closeSidebar }: TProps) => {
  const { path, label, hasArrow, children } = menuItem;
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const pathname = location.pathname;
  const active = pathname === path;

  const toggleOpen = () => {
    if (hasArrow) {
      setOpen(!open);
    } else if (path) {
      closeSidebar();
      navigate(path);
    }
  };
  return (
    <>
      <div>
        <div onClick={toggleOpen} className={`flex w-full justify-between items-center cursor-pointer rounded-md ${
              active
                ? "bg-primary text-white"
                : "text-black hover:bg-primary/40 hover:text-[#1a1a1a]"
            }`}>
          <div
            className={`flex items-center px-4 py-2.5 text-md rounded-md transition-colors group `}
          >
            <span
              className={`mr-3 hover:text-emerald-400 ${
                active
                  ? "text-white"
                  : "text-black group-hover:text-white"
              }`}
            >
              {<menuItem.icon className="hover:text-emerald-400" size={18}/>}
            </span>
            {label}
          </div>

          {/* <ChevronRight className="cursor-pointer"/> */}
          {hasArrow && (
            <span className="text-xs pr-3">
              {open ? <ChevronDown /> : <ChevronRight />}
            </span>
          )}
        </div>
        {open && children && (
          <div className="ml-8 mt-1 flex flex-col gap-1">
            {children.map((child, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(child.path)
                closeSidebar();
              }}
              className={`text-md px-2 py-1 rounded cursor-pointer ${
                pathname === child.path
                  ? 'bg-slate-700 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {child.label}
            </div>
          ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SidebarLink;
