import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const NativeRoutes = () => (
  <Routes>
    <Route path="/" element={<BioPrecision />} />
    <Route path="/bioprecision" element={<BioPrecision />} />
    <Route path="/quick-view" element={<BioPrecision />} />
    <Route path="/dashboard" element={<Navigate to="/" replace />} />
    {/* other routes like /data-entry, /photo-entry, etc. */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <NativeRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;

