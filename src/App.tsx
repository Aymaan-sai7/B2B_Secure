
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Layout from "./layout/Layout";

import Login from "./pages/AuthPages/Login";
import Otp from "./pages/AuthPages/Otp";
import Reset from "./pages/AuthPages/Reset";
import Forget from "./pages/AuthPages/Forget";

import NotFound from "./pages/OtherPage/NotFound";
import Dashboard from "./pages/Dashboard";
import Companies from "./pages/Company";
import Transactions from "./pages/Transactions";
import Admins from "./pages/Admin";
import Settings from "./pages/Setting";

import { ScrollToTop } from "./components/common/ScrollToTop";
import CompanyDetails from "./pages/CompanyDetails";
import TransactionDetails from "./pages/TransactionDetails";


import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";


import ProtectedRoute from "./routes/ProtectedRoute";


export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <ScrollToTop />

          <Routes>

            {/*  Protected Dashboard */}
            <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>

              <Route path="/" element={<Dashboard />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/admins" element={<Admins />} />
              <Route path="/settings" element={<Settings />} />

            </Route>

            {/*  Public Auth Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/forget" element={<Forget />} />

            {/* details (برضه محمية) */}
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

            <Route path="*" element={<NotFound />} />

          </Routes>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}



