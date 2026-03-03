import { createBrowserRouter, Navigate } from "react-router";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import AdminLayout from "./admin/layout/AdminLayout";
import DashboardOverview from "./admin/pages/DashboardOverview";
import CustomerKanbanPage from "./admin/pages/CustomerKanbanPage";
import EmailMarketingPage from "./admin/pages/EmailMarketingPage";
import AnalyticsPage from "./admin/pages/AnalyticsPage";
import LeadsPage from "./admin/pages/LeadsPage";
import QuotesPage from "./admin/pages/QuotesPage";
import OrdersPage from "./admin/pages/OrdersPage";
import ProductionPage from "./admin/pages/ProductionPage";
import DeliveriesPage from "./admin/pages/DeliveriesPage";
import ClientsPage from "./admin/pages/ClientsPage";
import SettingsPage from "./admin/pages/SettingsPage";
import { getAuthSession } from "./auth/authStore";

function ProtectedAdminRoute() {
  const session = getAuthSession();
  if (!session) return <Navigate to="/auth" replace />;
  return <AdminLayout />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/auth",
    Component: AuthPage,
  },
  {
    path: "/admin",
    Component: ProtectedAdminRoute,
    children: [
      {
        index: true,
        Component: DashboardOverview,
      },
      {
        path: "leads",
        Component: LeadsPage,
      },
      {
        path: "quotes",
        Component: QuotesPage,
      },
      {
        path: "orders",
        Component: OrdersPage,
      },
      {
        path: "production",
        Component: ProductionPage,
      },
      {
        path: "deliveries",
        Component: DeliveriesPage,
      },
      {
        path: "kanban",
        Component: CustomerKanbanPage,
      },
      {
        path: "email-marketing",
        Component: EmailMarketingPage,
      },
      {
        path: "analytics",
        Component: AnalyticsPage,
      },
      {
        path: "clients",
        Component: ClientsPage,
      },
      {
        path: "settings",
        Component: SettingsPage,
      },
    ],
  },
]);
