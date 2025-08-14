
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/features/auth/auth.context";
import { AdminLayout } from "@/components/layout/admin-layout";
import { UsersPage } from "@/features/users/users-page";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold mb-4">Roles Management</h2>
                  <p className="text-muted-foreground">Coming soon...</p>
                </div>
              </AdminLayout>
            } />
            <Route path="/audit" element={
              <AdminLayout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold mb-4">Audit Log</h2>
                  <p className="text-muted-foreground">Coming soon...</p>
                </div>
              </AdminLayout>
            } />
            <Route path="/reports" element={
              <AdminLayout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold mb-4">Reports</h2>
                  <p className="text-muted-foreground">Coming soon...</p>
                </div>
              </AdminLayout>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
