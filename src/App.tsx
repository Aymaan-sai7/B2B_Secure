
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


// ✅ Providers
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";

import { Toaster } from "react-hot-toast";


export default function App() {
  return (
    <ThemeProvider>
    <LanguageProvider>
    <Router>
      <ScrollToTop />
        <Toaster
  position="top-right"
  toastOptions={{
    style: {
      zIndex: 9999,
    },
  }}
/>
      <Routes>

        {/* Dashboard Layout */}
        <Route element={<Layout />}>

          <Route path="/" element={<Dashboard />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/admins" element={<Admins />} />
          <Route path="/settings" element={<Settings />} />

        </Route>

        {/* Auth Pages (بدون sidebar) */}
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/forget" element={<Forget />} />

        <Route path="*" element={<NotFound />} />

        <Route path="/company/:id" element={<CompanyDetails />} />
        <Route path="/transaction/:id" element={<TransactionDetails />} />
      </Routes>
    </Router>
    </LanguageProvider>
    </ThemeProvider>
  );
}






// import { BrowserRouter as Router, Routes, Route } from "react-router";
// import Login from "./pages/AuthPages/Login";
// import Otp from "./pages/AuthPages/Otp";
// import Reset from "./pages/AuthPages/Reset";
// import Forget from "./pages/AuthPages/Forget";
// import NotFound from "./pages/OtherPage/NotFound";
// import Dashboard from "./pages/Dashboard";
// import User from "./pages/User";
// import Company from "./pages/Company";

// import { ScrollToTop } from "./components/common/ScrollToTop";
// // import Home from "./pages/Dashboard/Home";

// export default function App() {
//   return (
//     <>
//       <Router>
//         <ScrollToTop />
//         <Routes>
//           {/* Dashboard */}
//             <Route index path="/" element={<Dashboard />} />

            
//             {/* Others Page */}
//             <Route path="/user" element={<User />} />
//             <Route path="/campany" element={<Company />} />

//           {/* Auth */}
//           <Route path="/Login" element={<Login />} />
//           <Route path="/Reset" element={<Reset />} />
//           <Route path="/Otp" element={<Otp />} />
//           <Route path="/Forget" element={<Forget />} />

//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </Router>
//     </>
//   );
// }
