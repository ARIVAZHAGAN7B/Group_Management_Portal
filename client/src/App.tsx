import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { StoreProvider, useStore } from "./store/store";
import { UserRole } from "./types";

import { Login } from "./Login";
import { AppLayout } from "./layout/AppLayout";

import { StudentRoutes } from "./student/StudentRoutes";
import { AdminRoutes } from "./admin/AdminRoutes";
import { FacultyRoutes } from "./faculty/FacultyRoutes";


// 🔐 Protected Route Wrapper
const ProtectedRoute: React.FC<{ allowedRole: UserRole }> = ({
  allowedRole,
}) => {
  const { auth } = useStore();

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (auth.user?.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return <AppLayout />;
};


const AppRouter: React.FC = () => {
  const { auth } = useStore();

  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route
          path="/login"
          element={
            auth.isAuthenticated ? <Navigate to="/" replace /> : <Login />
          }
        />

        {/* Student */}
        <Route
          path="/student/*"
          element={<ProtectedRoute allowedRole={UserRole.STUDENT} />}
        >
          <Route path="*" element={<StudentRoutes />} />
        </Route>

        {/* Admin */}
        <Route
          path="/admin/*"
          element={<ProtectedRoute allowedRole={UserRole.ADMIN} />}
        >
          <Route path="*" element={<AdminRoutes />} />
        </Route>

        {/* Faculty */}
        <Route
          path="/faculty/*"
          element={<ProtectedRoute allowedRole={UserRole.FACULTY} />}
        >
          <Route path="*" element={<FacultyRoutes />} />
        </Route>

        {/* Default Redirect */}
        <Route
          path="/"
          element={
            auth.user?.role === UserRole.STUDENT
              ? <Navigate to="/student/dashboard" />
              : auth.user?.role === UserRole.ADMIN
              ? <Navigate to="/admin/dashboard" />
              : auth.user?.role === UserRole.FACULTY
              ? <Navigate to="/faculty/dashboard" />
              : <Navigate to="/login" />
          }
        />

      </Routes>
    </BrowserRouter>
  );
};


const App: React.FC = () => {
  return (
    <StoreProvider>
      <AppRouter />
    </StoreProvider>
  );
};

export default App;
