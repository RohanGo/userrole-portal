
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/features/auth/auth.context";
import { ThemeProvider } from "@/contexts/theme-context";
import { AdminLayout } from "@/components/layout/admin-layout";
import { UsersPage } from "@/features/users/users-page";
import { RolesPage } from "@/features/roles/roles-page";
import { AuditPage } from "@/features/audit/audit-page";
import { ReportsPage } from "@/features/reports/reports-page";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/users" element={
                <AdminLayout>
                  <UsersPage />
                </AdminLayout>
              } />
              <Route path="/roles" element={
                <AdminLayout>
                  <RolesPage />
                </AdminLayout>
              } />
              <Route path="/audit" element={
                <AdminLayout>
                  <AuditPage />
                </AdminLayout>
              } />
              <Route path="/reports" element={
                <AdminLayout>
                  <ReportsPage />
                </AdminLayout>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
