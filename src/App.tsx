
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Layout from "./layout/Layout";

import Login from "./pages/AuthPages/Login";
import Otp from "./pages/AuthPages/Otp";
import Reset from "./pages/AuthPages/Reset";
import Forget from "./pages/AuthPages/Forget";

import NotFound from "./pages/OtherPage/NotFound";
import Dashboard from "./pages/CorePages/Dashboard";
import Companies from "./pages/CorePages/Company";
import Transactions from "./pages/CorePages/Transactions";
import Admins from "./pages/CorePages/Admin";
import Settings from "./pages/CorePages/Setting";

import { ScrollToTop } from "./components/common/ScrollToTop";
import CompanyDetails from "./pages/DetailsPage/CompanyDetails";
import TransactionDetails from "./pages/DetailsPage/TransactionDetails";
import AdminDetails from "./pages/DetailsPage/AdminDetails";


import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";


import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./pages/DetailsPage/Profile";
import SuperAdminRoute from "./routes/SuperAdminRoute";


export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <ScrollToTop />

          <Routes>

            {/*  protected dashboard */}
            <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>

              <Route path="/" element={<Dashboard />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route element={<SuperAdminRoute />}>
                <Route path="/admins" element={<Admins />} />
              </Route>
              <Route path="/settings" element={<Settings />} />

            </Route>

            {/*  Public Auth Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/forget" element={<Forget />} />

            {/* details برضه محمية */}
            <Route
              path="/company/:id"
              element={
                <ProtectedRoute>
                  <CompanyDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/transaction/:id"
              element={
                <ProtectedRoute>
                  <TransactionDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/:id"
              element={
                <ProtectedRoute>
                  <AdminDetails />
                </ProtectedRoute>
              }
            />

            <Route path="/profile" element={<Profile />} />

            <Route path="*" element={<NotFound />} />

          </Routes>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}



