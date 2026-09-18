import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./components/MainLayout";
import ProtectedRoute from "./components/ProtectedRoutes";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Resume from "./pages/Resume";
import Interview from "./pages/Interview";
import Register from "./pages/Register";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Home */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Application */}
        <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/resume" element={<Resume />} />

          <Route path="/interview" element={<Interview />} />
        </Route>
        </Route>

        {/* Unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
