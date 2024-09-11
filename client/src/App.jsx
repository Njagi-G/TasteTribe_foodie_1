import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Outlet, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const isAuthPage = ["/login", "/signup", "/"].includes(location.pathname);
  const isAuthenticated = localStorage.getItem("token") !== null;

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && isAuthenticated && <NavBar />}
      <main className="flex-grow overflow-auto">
        <div className="max-h-[calc(100vh-120px)]">
          <Outlet />
        </div>
      </main>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
