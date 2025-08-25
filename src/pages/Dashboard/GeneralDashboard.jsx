import { Link } from "react-router-dom";
import Nav from "../../components/Nav";

export default function GeneralDashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
       <Nav/>

      {/* Hero Section */}
      <div className="mt-20 relative w-full h-[500px]">
        <img
          src="https://images.unsplash.com/photo-1590568264144-4e33bb2f5ee6?auto=format&fit=crop&w=1350&q=80"
          alt="Logistics Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white p-6">
            <h1 className="text-4xl font-bold mb-4">Welcome to LogisticsApp</h1>
            <p className="text-lg mb-6">
              Smart logistics solutions for businesses, drivers, and managers.
            </p>
            <Link
              to="/register"
              className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Logistics Images Section */}
      <section className="bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         <img
            src="https://images.unsplash.com/photo-1601758123927-2c3f2b35f09e?auto=format&fit=crop&w=600&q=80"
            alt="Truck"
            className="rounded-lg shadow-lg object-cover w-full h-64"
          />
          <img
            src="https://images.unsplash.com/photo-1615843846583-c022b8761bc8?auto=format&fit=crop&w=600&q=80"
            alt="Warehouse"
            className="rounded-lg shadow-lg object-cover w-full h-64"
          />
          <img
            src="https://images.unsplash.com/photo-1602524208571-6b1eea71f019?auto=format&fit=crop&w=600&q=80"
            alt="Containers"
            className="rounded-lg shadow-lg object-cover w-full h-64"
          />
        </div>
      </section>
    </div>
  );
}
