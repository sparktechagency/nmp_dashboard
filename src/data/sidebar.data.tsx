import { LayoutDashboard, Snowflake, UsersRound } from "lucide-react";
import {
    SettingOutlined
  } from '@ant-design/icons';
import { MdCategory, MdContactPhone, MdSubscriptions, MdUnsubscribe } from "react-icons/md";
import { PiResize, PiStudentBold } from "react-icons/pi";
import { GrUserAdmin, GrCircleInformation } from "react-icons/gr";
import { RiProductHuntLine } from "react-icons/ri";
import { PiInvoiceBold } from "react-icons/pi";
import { SiBrandfolder } from "react-icons/si";

export const adminMenuItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/orders", label: "Orders", icon: PiInvoiceBold },
  { path: "/admins", label: "Admins", icon: GrUserAdmin },
  { path: "/users", label: "Users", icon: UsersRound },
  { path: "/category", label: "Category", icon: MdCategory },
  { path: "/brands", label: "Brand", icon: SiBrandfolder },
  { path: "/flavors", label: "Flavor", icon: Snowflake},
  { path: "/products", label: "Products", icon: RiProductHuntLine },
  { path: "/information", label: "Contact Information", icon: GrCircleInformation },
  { path: "/contacts", label: "Contact List", icon: MdContactPhone },
  { path: "/subscribers", label: "Subscribers", icon: MdUnsubscribe },
  // {
  //   path: "",
  //   label: "Help & FAQ",
  //   icon: MdSubscriptions,
  //   hasArrow: true,
  //   children: [
  //     { path: "/help", label: "Help & Support" },
  //     { path: "/faqs", label: "FAQS" },
  //   ],
  // },
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
  { path: "/users", label: "Users", icon: PiStudentBold },
  { path: "/category", label: "Category", icon: MdCategory },
  { path: "/sizes", label: "Sizes", icon: PiResize },
  { path: "/products", label: "Products", icon: RiProductHuntLine },
  { path: "/information", label: "Contact Information", icon: GrCircleInformation },
  { path: "/contacts", label: "Contact List", icon: MdContactPhone },
  { path: "/subscribers", label: "Subscribers", icon: MdUnsubscribe },
  {
    path: "",
    label: "Help & FAQ",
    icon: MdSubscriptions,
    hasArrow: true,
    children: [
      { path: "/help", label: "Help & Support" },
      { path: "/faqs", label: "FAQS" },
    ],
  },
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

