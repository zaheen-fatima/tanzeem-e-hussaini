// import { BrowserRouter, Routes, Route } from "react-router-dom";
//
// import Navbar from "./components/layout/Navbar";
// import Footer from "./components/layout/Footer";
//
// import Home from "./pages/Home/Home";
// import Videos from "./pages/Videos/Videos";
// import Login from "./pages/Admin/Login";
// import VideosManagement from "./pages/Admin/VideosManagement.jsx";
// import Articles from "./pages/Articles/Articles";
// import Events from "./pages/Events/Events";
// import Gallery from "./pages/Gallery/Gallery";
// import Quran from "./pages/Quran/Quran";
// import Contact from "./pages/Contact/Contact";
// import AdminRoute from "./routes/AdminRoute";
//
// import "./styles/global.css";
//
// function App() {
//   return (
//       <BrowserRouter>
//         <Navbar />
//
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/videos" element={<Videos />} />
//           <Route path="/admin/login" element={<Login />} />
//             <Route path="/articles" element={<Articles />} />
//             <Route path="/events" element={<Events />} />
//             <Route path="/gallery" element={<Gallery />} />
//             <Route path="/quran" element={<Quran />} />
//             <Route path="/contact" element={<Contact />} />
//           <Route
//               path="/admin"
//               element={
//                 <AdminRoute>
//                   <VideosManagement />
//                 </AdminRoute>
//               }
//           />
//         </Routes>
//
//         <Footer />
//       </BrowserRouter>
//   );
// }
//
// export default App;


import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home/Home";
import Videos from "./pages/Videos/Videos";
import Articles from "./pages/Articles/Articles";
import Events from "./pages/Events/Events";
import Gallery from "./pages/Gallery/Gallery";
import Quran from "./pages/Quran/Quran";
import Contact from "./pages/Contact/Contact";

import Login from "./pages/Admin/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoute from "./routes/AdminRoute";

import "./styles/global.css";
import ScrollToTop from "./components/common/ScrollToTop.jsx";

function AppLayout() {
    const location = useLocation();
    const isAdminPage = location.pathname.startsWith("/admin");

    return (
        <>
            {!isAdminPage && <Navbar />}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/events" element={<Events />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/quran" element={<Quran />} />
                <Route path="/contact" element={<Contact />} />

                <Route path="/admin/login" element={<Login />} />

                <Route
                    path="/admin"
                    element={
                        <AdminRoute>
                            <AdminDashboard />
                        </AdminRoute>
                    }
                />
            </Routes>

            {!isAdminPage && <Footer />}
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <AppLayout />
        </BrowserRouter>
    );
}

export default App;