/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense, type ReactNode } from "react";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import NotFoundRoute from "./NotFoundRoute";

// Layouts
const DashboardLayout = lazy(() => import("../components/DashboardLayout/DashboardLayout"));
const AuthLayout = lazy(() => import("../components/AuthLayout/AuthLayout"));

// Auth Pages
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const ForgotPasswordPage = lazy(() => import("../pages/auth/ForgotPasswordPage"));
const VerifyOtpPage = lazy(() => import("../pages/auth/VerifyOtpPage"));
const ResetPasswordPage = lazy(() => import("../pages/auth/ResetPasswordPage"));

// Dashboard Pages
const DashboardPage = lazy(() => import("../pages/dashboard/DashboardPage"));
const CategoryPage = lazy(() => import("../pages/dashboard/CategoryPage"));
const ContactPage = lazy(() => import("../pages/dashboard/ContactPage"));
const AdminsPage = lazy(() => import("../pages/dashboard/AdminsPage"));
const UsersPage = lazy(() => import("../pages/dashboard/UsersPage"));
const InformationPage = lazy(() => import("../pages/dashboard/InformationPage"));
const BrandsPage = lazy(() => import("../pages/dashboard/BrandsPage"));
const FlavorPage = lazy(() => import("../pages/dashboard/FlavorPage"));
const TypesPage = lazy(() => import("../pages/dashboard/TypesPage"));
const ShippingPage = lazy(() => import("../pages/dashboard/ShippingPage"));

// Product Pages
const ProductsPage = lazy(() => import("../pages/product/ProductsPage"));
const CreateProductPage = lazy(() => import("../pages/product/CreateProductPage"));
const UpdateProductPage = lazy(() => import("../pages/product/UpdateProductPage"));
const ProductDetailsPage = lazy(() => import("../pages/product/ProductDetailsPage"));
const FeatureProductsPage = lazy(() => import("../pages/product/FeatureProductsPage"));

// Order Pages
const OrdersPage = lazy(() => import("../pages/order/OrdersPage"));
const OrderDetailsPage = lazy(() => import("../pages/order/OrderDetailsPage"));

// Settings
const AboutUsPage = lazy(() => import("../pages/settings/AboutUsPage"));
const PrivacyPolicyPage = lazy(() => import("../pages/settings/PrivacyPolicyPage"));
const TermsConditionPage = lazy(() => import("../pages/settings/TermsConditionPage"));
const ProfilePage = lazy(() => import("../pages/settings/ProfilePage"));
const ChangePasswordPage = lazy(() => import("../pages/settings/ChangePasswordPage"));

// Fallback Loader
const Loader = () => <div className="p-10 text-center">Loading...</div>;

const withSuspense = (element:ReactNode) => (
  <Suspense fallback={<Loader />}>{element}</Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        {withSuspense(<DashboardLayout />)}
      </PrivateRoute>
    ),
    children: [
      { index: true, element: withSuspense(<DashboardPage />) },
      { path: "orders", element: withSuspense(<OrdersPage />) },
      { path: "order-details/:id", element: withSuspense(<OrderDetailsPage />) },
      { path: "admins", element: withSuspense(<AdminsPage />) },
      { path: "users", element: withSuspense(<UsersPage />) },
      { path: "types", element: withSuspense(<TypesPage />) },
      { path: "category", element: withSuspense(<CategoryPage />) },
      { path: "brands", element: withSuspense(<BrandsPage />) },
      { path: "flavors", element: withSuspense(<FlavorPage />) },
      { path: "information", element: withSuspense(<InformationPage />) },
      { path: "contacts", element: withSuspense(<ContactPage />) },
      { path: "products", element: withSuspense(<ProductsPage />) },
      { path: "feature-products", element: withSuspense(<FeatureProductsPage />) },
      { path: "add-product", element: withSuspense(<CreateProductPage />) },
      { path: "update-product/:id", element: withSuspense(<UpdateProductPage />) },
      { path: "product-details/:id", element: withSuspense(<ProductDetailsPage />) },
      { path: "profile", element: withSuspense(<ProfilePage />) },
      { path: "change-password", element: withSuspense(<ChangePasswordPage />) },
      { path: "about-us", element: withSuspense(<AboutUsPage />) },
      { path: "privacy-policy", element: withSuspense(<PrivacyPolicyPage />) },
      { path: "terms-condition", element: withSuspense(<TermsConditionPage />) },
      { path: "shipping", element: withSuspense(<ShippingPage />) },
    ],
  },

  {
    path: "/auth",
    element: (
      <PublicRoute>
        {withSuspense(<AuthLayout />)}
      </PublicRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/auth/signin" replace /> },
      { path: "signin", element: withSuspense(<LoginPage />) },
      { path: "forgot-password", element: withSuspense(<ForgotPasswordPage />) },
      { path: "verify-otp", element: withSuspense(<VerifyOtpPage />) },
      { path: "reset-password", element: withSuspense(<ResetPasswordPage />) },
    ],
  },

  {
    path: "*",
    element: withSuspense(<NotFoundRoute />),
  },
]);

export default router;
