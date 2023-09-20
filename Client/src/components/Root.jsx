import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Root() {
  return (
    <>
      <Navbar />
      <main style={{minHeight: '95vh'}}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
