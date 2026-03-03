import { Outlet, Link, useLocation, useNavigate } from "react-router";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarTrigger,
  SidebarInset,
  useSidebar
} from "@/app/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  Settings,
  Printer,
  KanbanSquare,
  Mail,
  ChartColumn,
  UserPlus,
  FileText,
  ShoppingCart,
  Cog,
  Truck,
} from "lucide-react";
import { getAuthSession, logoutAccount } from "@/app/auth/authStore";
import { ErrorBoundary } from "@/app/components/ui/ErrorBoundary";

const navItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Leads", url: "/admin/leads", icon: UserPlus },
  { title: "Cotizaciones", url: "/admin/quotes", icon: FileText },
  { title: "Pedidos", url: "/admin/orders", icon: ShoppingCart },
  { title: "Producción", url: "/admin/production", icon: Cog },
  { title: "Entregas", url: "/admin/deliveries", icon: Truck },
  { title: "Kanban CRM", url: "/admin/kanban", icon: KanbanSquare },
  { title: "Email Marketing", url: "/admin/email-marketing", icon: Mail },
  { title: "Analíticas", url: "/admin/analytics", icon: ChartColumn },
  { title: "Clientes", url: "/admin/clients", icon: Users },
  { title: "Configuración", url: "/admin/settings", icon: Settings },
];

const AdminSidebarMenu = () => {
  const location = useLocation();
  const { isMobile, setOpenMobile } = useSidebar();
  return (
    <SidebarMenu>
      {navItems.map((item) => {
        const isActive =
          location.pathname === item.url ||
          (item.url !== "/admin" && location.pathname.startsWith(item.url));
        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              onClick={() => {
                if (isMobile) setOpenMobile(false);
              }}
              className={`text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-300 rounded-xl ${isActive ? "bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]" : ""
                }`}
            >
              <Link to={item.url} className="flex items-center gap-3 py-2 px-3">
                <item.icon className={`w-4 h-4 ${isActive ? "text-indigo-400" : ""}`} />
                <span className="font-medium">{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
};

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const session = getAuthSession();

  return (
    <div className="relative min-h-screen bg-black text-white font-sans selection:bg-indigo-500/30">
      {/* Global Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 max-w-lg w-full h-[500px] bg-indigo-500/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] max-w-lg w-full h-[500px] bg-purple-500/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <SidebarProvider className="relative z-10">
        <Sidebar variant="sidebar" className="dark bg-black/40 backdrop-blur-xl border-r border-white/5 text-white">
          <SidebarHeader className="border-b border-white/5 p-4">
            <div className="flex items-center gap-3 px-2 py-1">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                <Printer className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                VAERTER
              </span>
            </div>
          </SidebarHeader>
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs uppercase tracking-wider text-zinc-500 font-medium mb-2 px-2">
                Menú Principal
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <AdminSidebarMenu />
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="bg-transparent flex-1 flex flex-col min-h-screen">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-white/5 px-4 sm:px-6 bg-black/20 backdrop-blur-md sticky top-0 z-40 w-full transition-all duration-300">
            <SidebarTrigger className="text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg p-2 transition-colors" />
            <div className="w-px h-6 bg-white/10 mx-2" />
            <h1 className="font-semibold text-zinc-100 truncate text-lg">
              {navItems.find((i) =>
                location.pathname === i.url ||
                (i.url !== "/admin" && location.pathname.startsWith(i.url))
              )?.title || "Administración"}
            </h1>
            <div className="ml-auto flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-medium text-zinc-200">
                  {session?.name ?? "Usuario"}
                </span>
                <span className="text-xs text-zinc-500">
                  {session?.email ?? "admin@vaerter.com"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  logoutAccount();
                  navigate("/auth", { replace: true });
                }}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition-all duration-300 shadow-[0_4px_14px_0_rgba(255,255,255,0.05)]"
              >
                Cerrar sesión
              </button>
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-auto">
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
