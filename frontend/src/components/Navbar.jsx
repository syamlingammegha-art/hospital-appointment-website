import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const goToDashboard = () => {
    if (!user) return;

    switch (user.role) {
      case "staff":
        navigate("/staff-dashboard");
        break;
      case "doctor":
        navigate("/doctor-dashboard");
        break;
      default:
        navigate("/patient-dashboard");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-teal-700 flex items-center justify-center text-white font-bold text-xl">
            M
          </div>

          <div>
            <h1 className="font-bold text-xl text-teal-800">MediCare</h1>
            <p className="text-xs text-gray-500">Hospital</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-teal-700 transition">
            Home
          </Link>

          <Link to="/doctors" className="hover:text-teal-700 transition">
            Find Doctors
          </Link>

          <Link to="/services" className="hover:text-teal-700 transition">
            Services
          </Link>

          <Link to="/about" className="hover:text-teal-700 transition">
            About
          </Link>

          <Link to="/contact" className="hover:text-teal-700 transition">
            Contact
          </Link>
        </div>

        {/* Desktop Right Side */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <>
              <button
                onClick={goToDashboard}
                className="bg-teal-700 text-white px-5 py-2 rounded-full hover:bg-teal-800 transition font-semibold"
              >
                Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="px-5 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2 border border-teal-700 text-teal-700 rounded-full hover:bg-teal-50 transition font-semibold"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="px-5 py-2 bg-teal-700 text-white rounded-full font-semibold hover:bg-teal-800 transition shadow-lg"
              >
                Register
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden px-6 pb-6 bg-white border-t">
          <div className="flex flex-col gap-4 pt-4 text-gray-700 font-medium">
            <Link to="/" onClick={() => setOpen(false)}>
              Home
            </Link>

            <Link to="/doctors" onClick={() => setOpen(false)}>
              Find Doctors
            </Link>

            <Link to="/services" onClick={() => setOpen(false)}>
              Services
            </Link>

            <Link to="/about" onClick={() => setOpen(false)}>
              About
            </Link>

            <Link to="/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>

            {user ? (
              <>
                <button
                  onClick={() => {
                    goToDashboard();
                    setOpen(false);
                  }}
                  className="bg-teal-700 text-white py-3 rounded-xl font-semibold"
                >
                  Dashboard
                </button>

                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="border border-red-500 text-red-500 py-3 rounded-xl font-semibold hover:bg-red-500 hover:text-white transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/login");
                    setOpen(false);
                  }}
                  className="border border-teal-700 text-teal-700 py-3 rounded-xl font-semibold"
                >
                  Login
                </button>

                <button
                  onClick={() => {
                    navigate("/register");
                    setOpen(false);
                  }}
                  className="bg-teal-700 text-white py-3 rounded-xl font-semibold shadow-md"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}