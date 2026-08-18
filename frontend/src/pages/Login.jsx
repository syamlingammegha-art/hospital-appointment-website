import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import {
  Home,
  Mail,
  Lock,
  Eye,
  EyeOff,
  HeartPulse,
} from "lucide-react";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user;

      const res = await api.post("/auth/google", {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/patient-dashboard");
    } catch (error) {
      console.error(error);

      if (error.code === "auth/popup-closed-by-user") {
        alert("Google login was cancelled.");
      } else {
        alert(
          error.response?.data?.message ||
            "Google Login Failed"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Normal Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      if (res.data.user.role === "staff") {
  navigate("/staff-dashboard");
} else if (res.data.user.role === "doctor") {
  navigate("/doctor-dashboard");
} else {
  navigate("/patient-dashboard");
}
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#23A8AD] overflow-hidden relative flex items-center justify-center px-4 py-10">

      {/* =====================================================
          BACK TO HOME BUTTON
      ====================================================== */}

      <Link
        to="/"
        className="
          fixed
          left-6
          top-6
          z-50
          flex
          items-center
          gap-2
          rounded-full
          bg-white
          px-5
          py-2.5
          text-sm
          font-semibold
          text-[#087F83]
          shadow-lg
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
        "
      >
        <Home size={18} />
        Back to Home
      </Link>

      {/* Background Circles */}

      <div className="absolute -top-44 -left-36 w-[520px] h-[520px] rounded-full bg-[#0A8B90]/40"></div>

      <div className="absolute bottom-[-180px] right-[-120px] w-[480px] h-[480px] rounded-full bg-[#0A8B90]/35"></div>

      {/* Main Card */}

      <div className="w-full max-w-6xl bg-white rounded-[35px] overflow-hidden shadow-2xl grid lg:grid-cols-2">

        {/* =====================================================
            LEFT SIDE
        ====================================================== */}

        <div className="relative bg-[#A8D8D8] overflow-hidden">

          <div className="absolute inset-0 opacity-20">

            <div className="absolute left-10 top-10 w-24 h-24 border-8 border-white rounded"></div>

            <div className="absolute right-10 top-24 w-20 h-20 border-8 border-white rounded"></div>

            <div className="absolute left-24 bottom-32 w-20 h-20 border-8 border-white rounded"></div>

          </div>

          <div className="relative flex flex-col justify-between h-full p-8">

            <div className="flex justify-end">

              <div className="max-w-[220px] text-black">

                <p className="text-5xl font-black">
                  “
                </p>

                <h2 className="text-4xl font-black uppercase leading-tight">
                  Putting People First In Every Healthcare Moment
                </h2>

              </div>

            </div>

            <div className="flex justify-center">

              <img
                src="/images/login-nurse.png"
                alt="Nurse"
                className="max-h-[560px] object-contain"
              />

            </div>

          </div>

        </div>

        {/* =====================================================
            RIGHT SIDE
        ====================================================== */}

        <div className="bg-white px-10 lg:px-14 py-12 flex items-center">

          <form
            onSubmit={handleLogin}
            className="w-full"
          >

            {/* Logo */}

            <div className="flex items-center gap-3 mb-8">

              <div className="w-12 h-12 rounded-xl bg-[#23A8AD] text-white flex items-center justify-center">

                <HeartPulse size={24} />

              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  MediCare
                </h2>

                <p className="text-gray-500 text-sm">
                  Hospital
                </p>

              </div>

            </div>

            {/* Heading */}

            <h1 className="text-5xl font-black text-gray-900">
              Welcome Back!
            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              Enter your email and password.
            </p>

            {/* =================================================
                EMAIL
            ================================================== */}

            <div className="mt-10">

              <div className="bg-gray-100 rounded-full px-5 py-4 flex items-center">

                <Mail
                  className="text-gray-500"
                  size={20}
                />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter Email ID"
                  className="bg-transparent ml-3 w-full outline-none"
                  required
                />

              </div>

            </div>

            {/* =================================================
                PASSWORD
            ================================================== */}

            <div className="mt-6">

              <div className="bg-gray-100 rounded-full px-5 py-4 flex items-center">

                <Lock
                  className="text-gray-500"
                  size={20}
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="bg-transparent ml-3 w-full outline-none"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="text-gray-500 hover:text-[#23A8AD]"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

            </div>

            {/* Forgot Password */}

            <div className="text-right mt-5">

              <Link
                to="/forgot-password"
                className="text-sm font-medium text-gray-700 hover:text-[#23A8AD]"
              >
                Forgot Password?
              </Link>

            </div>

            {/* =================================================
                LOGIN BUTTON
            ================================================== */}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                mt-8
                bg-[#5BC3C4]
                hover:bg-[#45B4B5]
                text-white
                py-4
                rounded-full
                text-lg
                font-bold
                transition
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>

            {/* Divider */}

            <div className="flex items-center gap-4 my-8">

              <div className="flex-1 border"></div>

              <span className="text-gray-500">
                OR
              </span>

              <div className="flex-1 border"></div>

            </div>

            {/* =================================================
                SOCIAL LOGIN
            ================================================== */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Google */}

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="
                  border
                  rounded-full
                  py-3
                  flex
                  justify-center
                  items-center
                  gap-2
                  hover:bg-gray-50
                  transition
                  disabled:opacity-60
                "
              >
                <FcGoogle size={24} />

                Continue with Google
              </button>

              {/* Facebook */}

              <button
                type="button"
                className="
                  border
                  rounded-full
                  py-3
                  flex
                  justify-center
                  items-center
                  gap-2
                  hover:bg-gray-50
                  transition
                "
              >
                <FaFacebook
                  size={22}
                  className="text-blue-600"
                />

                Facebook
              </button>

            </div>

            {/* Register */}

            <p className="text-center mt-8 text-gray-600">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="text-[#23A8AD] font-semibold hover:underline"
              >
                Register Now
              </Link>

            </p>

          </form>

        </div>

      </div>

    </div>
  );
}