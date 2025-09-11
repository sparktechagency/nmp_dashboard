import { LayoutDashboard, Snowflake, Users } from "lucide-react";
import {
    SettingOutlined
  } from '@ant-design/icons';
import { MdCategory, MdContactPhone, MdFeaturedPlayList } from "react-icons/md";
import { GrUserAdmin, GrCircleInformation } from "react-icons/gr";
import { RiProductHuntLine } from "react-icons/ri";
import { PiInvoiceBold } from "react-icons/pi";
import { SiBrandfolder } from "react-icons/si";
import { FaShippingFast } from "react-icons/fa";
import { LuFileType } from "react-icons/lu";

export const adminMenuItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/orders", label: "Orders", icon: PiInvoiceBold },
  { path: "/users", label: "Users", icon: Users  },
  { path: "/shipping", label: "Shipping Cost", icon: FaShippingFast },
  { path: "/types", label: "Type", icon: LuFileType },
  { path: "/category", label: "Category", icon: MdCategory },
  { path: "/brands", label: "Brand", icon: SiBrandfolder },
  { path: "/flavors", label: "Flavor", icon: Snowflake},
  { path: "/products", label: "Products", icon: RiProductHuntLine },
  { path: "/feature-products", label: "Feature Products", icon: MdFeaturedPlayList },
  { path: "/information", label: "Information", icon: GrCircleInformation },
  { path: "/contacts", label: "Contact List", icon: MdContactPhone },
  {
    icon: SettingOutlined,
    label: "Settings",
    hasArrow: true,
    children: [
      { path: "/profile", label: "Profile" },
      { path: "/change-password", label: "Change Password" },
      { path: "/about-us", label: "About Us" },
      { path: "/terms-condition", label: "Terms & Conditions" },
      { path: "/privacy-policy", label: "Privacy Policy" },
    ],
  },
];
export const superAdminMenuItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/orders", label: "Orders", icon: PiInvoiceBold },
  { path: "/admins", label: "Admins", icon: GrUserAdmin },
  { path: "/users", label: "Users", icon: Users },
  { path: "/shipping", label: "Shipping Cost", icon: FaShippingFast },
  { path: "/types", label: "Type", icon: LuFileType },
  { path: "/category", label: "Category", icon: MdCategory },
  { path: "/brands", label: "Brand", icon: SiBrandfolder },
  { path: "/flavors", label: "Flavor", icon: Snowflake},
  { path: "/products", label: "Products", icon: RiProductHuntLine },
  { path: "/feature-products", label: "Feature Products", icon: MdFeaturedPlayList },
  { path: "/information", label: "Information", icon: GrCircleInformation },
  { path: "/contacts", label: "Contact List", icon: MdContactPhone },
  {
    icon: SettingOutlined,
    label: "Settings",
    hasArrow: true,
    children: [
      { path: "/profile", label: "Profile" },
      { path: "/change-password", label: "Change Password" },
      { path: "/about-us", label: "About Us" },
      { path: "/terms-condition", label: "Terms & Conditions" },
      { path: "/privacy-policy", label: "Privacy Policy" },
    ],
  },
];

