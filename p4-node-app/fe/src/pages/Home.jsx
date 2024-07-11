import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  return (
  <div>
    <Header />
    <main 
      className="h-screen"
    >
    <div className="w-1/2 p-40">
      <p className="text-7xl font-bold text-custom-blue">
        MailMen
      </p>
      <p className="text-7xl">
        Email Delivered to Your Doorstep
      </p>
    </div>
    <Outlet />
    </main>
    <Footer />
  </div>
  )
}

export default Home;
