import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../pages/dashboard/DashboardPage";
import LoginPage from "../pages/auth/LoginPage";
import DashboardLayout from "../components/DashboardLayout/DashboardLayout";
import AuthLayout from "../components/AuthLayout/AuthLayout";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import VerifyOtpPage from "../pages/auth/VerifyOtpPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import CategoryPage from "../pages/dashboard/CategoryPage";
import ContactPage from "../pages/dashboard/ContactPage";
import AboutUsPage from "../pages/settings/AboutUsPage";
import PrivacyPolicyPage from "../pages/settings/PrivacyPolicyPage";
import TermsConditionPage from "../pages/settings/TermsConditionPage";
import ProfilePage from "../pages/settings/ProfilePage";
import ChangePasswordPage from "../pages/settings/ChangePasswordPage";
import AdminsPage from "../pages/dashboard/AdminsPage";
import HelpPage from "../pages/help/HelpPage";
import FaqsPage from "../pages/help/FaqsPage";
import UsersPage from "../pages/dashboard/UsersPage";
import SizesPage from "../pages/dashboard/SizesPage";
import InformationPage from "../pages/dashboard/InformationPage";
import ProductsPage from "../pages/product/ProductsPage";
import CreateProductPage from "../pages/product/CreateProductPage";
import UpdateProductPage from "../pages/product/UpdateProductPage";
import ProductDetailsPage from "../pages/product/ProductDetailsPage";
import OrdersPage from "../pages/order/OrdersPage";
import OrderDetailsPage from "../pages/order/OrderDetailsPage";
import SubscriptionsPage from "../pages/dashboard/SubscribersPage";
import BrandsPage from "../pages/dashboard/BrandsPage";
import FlavorPage from "../pages/dashboard/FlavorPage";
import NotFoundRoute from "./NotFoundRoute";

const router = createBrowserRouter([
  {
    path: "/",
    // element: (
    //   <PrivateRoute>
    //     <DashboardLayout />
    //   </PrivateRoute>
    // ),
    element: (
        <DashboardLayout />
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "orders",
        element: <OrdersPage />,
      },
      {
        path: "order-details/:id",
        element: <OrderDetailsPage />,
      },
      {
        path: "admins",
        element: <AdminsPage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "category",
        element: <CategoryPage />,
      },
      {
        path: "brands",
        element: <BrandsPage />,
      },
      {
        path: "flavors",
        element: <FlavorPage />,
      },
      {
        path: "sizes",
        element: <SizesPage />,
      },
      {
        path: "help",
        element: <HelpPage />,
      },
      {
        path: "faqs",
        element: <FaqsPage />,
      },
      {
        path: "information",
        element: <InformationPage />,
      },
      {
        path: "contacts",
        element: <ContactPage />,
      },
      {
        path: "subscribers",
        element: <SubscriptionsPage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "add-product",
        element: <CreateProductPage />,
      },
      {
        path: "update-product/:id",
        element: <UpdateProductPage />,
      },
      {
        path: "product-details/:id",
        element: <ProductDetailsPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "change-password",
        element: <ChangePasswordPage />,
      },
      {
        path: "about-us",
        element: <AboutUsPage />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicyPage />,
      },
      {
        path: "terms-condition",
        element: <TermsConditionPage />,
      }
    ],
  },
  {
    path: "/auth",
    element: (
        <AuthLayout />
    ),
    // element: (
    //   <PublicRoute>
    //     <AuthLayout />
    //   </PublicRoute>
    // ),
    children: [
      // {
      //   index: true,
      //   element: <Navigate to="/auth/signin" replace />,
      // },
      {
        path: "signin",
        element: <LoginPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "verify-otp",
        element: <VerifyOtpPage />,
      },
      {
        path: "reset-password",
        element: <ResetPasswordPage />,
      },
    ],
  },
  {
    path: "*",
    // element: <h1>This is Not Found Page</h1>
    element: <NotFoundRoute/>,
  },
]);

export default router;
