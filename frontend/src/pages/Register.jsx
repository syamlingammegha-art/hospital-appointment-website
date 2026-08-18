import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Calendar,
  VenusAndMars,
  HeartPulse,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Home,
  ArrowLeft,
} from "lucide-react";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const getPasswordStrength = () => {
    const password = form.password;

    if (!password) return 0;

    if (password.length < 6) {
      return 1;
    }

    if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    ) {
      return 3;
    }

    return 2;
  };

  const passwordStrength = getPasswordStrength();

  // Normal Registration
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !form.full_name ||
      !form.email ||
      !form.phone ||
      !form.age ||
      !form.gender ||
      !form.password
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register", {
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        age: Number(form.age),
        gender: form.gender,
        password: form.password,
      });

      setSuccess("Account created successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Google Registration
  const handleGoogleRegister = async () => {
    try {
      setError("");
      setSuccess("");
      setGoogleLoading(true);

      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user;

      await api.post("/auth/google", {
        full_name: user.displayName || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
        firebase_uid: user.uid,
      });

      setSuccess("Google account registered successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.error("Google registration error:", err);

      if (err.code === "auth/popup-closed-by-user") {
        setError("Google sign-in was cancelled.");
      } else if (err.code === "auth/popup-blocked") {
        setError(
          "Google popup was blocked. Please allow popups and try again."
        );
      } else {
        setError(
          err.response?.data?.message ||
            "Google registration failed. Please try again."
        );
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#061b2a] text-white">

      {/* ================= BACKGROUND ================= */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(20,184,166,0.25),transparent_35%),radial-gradient(circle_at_90%_80%,rgba(37,99,235,0.25),transparent_35%)]" />

        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-teal-400/10 blur-3xl" />

        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      {/* ================= MAIN ================= */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-8">

        <div className="w-full max-w-6xl">

          {/* ================= TOP BAR ================= */}
          <div className="mb-6 flex items-center justify-between">

            {/* Brand */}
            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-400 text-[#06202e] shadow-lg shadow-teal-500/20">
                <HeartPulse
                  size={25}
                  strokeWidth={2.5}
                />
              </div>

              <div>
                <h1 className="text-xl font-bold tracking-wide">
                  MediCare
                </h1>

                <p className="text-xs text-slate-400">
                  Advanced Healthcare
                </p>
              </div>

            </div>

            {/* Right Buttons */}
            <div className="flex items-center gap-3">

              {/* BACK TO HOME BUTTON */}
              <Link
                to="/"
                className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition duration-300 hover:border-teal-300/40 hover:bg-teal-400/15 hover:text-teal-200"
              >
                <ArrowLeft
                  size={17}
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />

                <Home size={17} />

                <span>Back to Home</span>
              </Link>

              {/* LOGIN BUTTON */}
              <Link
                to="/login"
                className="hidden rounded-full bg-teal-400 px-5 py-2.5 text-sm font-semibold text-[#06202e] transition duration-300 hover:bg-teal-300 sm:block"
              >
                Sign In
              </Link>

            </div>

          </div>

          {/* ================= MAIN CARD ================= */}
          <div className="grid overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.06] shadow-2xl backdrop-blur-xl lg:grid-cols-[0.9fr_1.1fr]">

            {/* ================= LEFT SIDE ================= */}
            <div className="relative hidden min-h-[720px] overflow-hidden lg:block">

              {/* Decorative circles */}
              <div className="absolute -left-24 top-20 h-72 w-72 rounded-full border border-teal-300/20" />

              <div className="absolute -left-12 top-32 h-48 w-48 rounded-full border border-teal-300/10" />

              <div className="absolute right-[-100px] top-[-100px] h-72 w-72 rounded-full border border-blue-400/10" />

              <div className="relative flex h-full flex-col justify-between p-12">

                <div>

                  {/* Badge */}
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-300/10 px-4 py-2 text-sm text-teal-200">

                    <ShieldCheck size={17} />

                    Secure Healthcare Platform

                  </div>

                  {/* Heading */}
                  <h2 className="max-w-md text-5xl font-bold leading-tight">

                    Start your

                    <span className="block text-teal-300">
                      healthier journey.
                    </span>

                  </h2>

                  <p className="mt-6 max-w-md text-base leading-7 text-slate-300">
                    Create your personal healthcare account and get
                    connected with trusted doctors, appointments and
                    essential medical services.
                  </p>

                </div>

                {/* Benefits */}
                <div className="space-y-5">

                  {/* Benefit 1 */}
                  <div className="flex items-center gap-4">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                      <CheckCircle2
                        className="text-teal-300"
                        size={21}
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        Easy Appointment Booking
                      </h3>

                      <p className="text-sm text-slate-400">
                        Find and book appointments easily.
                      </p>
                    </div>

                  </div>

                  {/* Benefit 2 */}
                  <div className="flex items-center gap-4">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                      <CheckCircle2
                        className="text-teal-300"
                        size={21}
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        Trusted Doctors
                      </h3>

                      <p className="text-sm text-slate-400">
                        Connect with qualified healthcare professionals.
                      </p>
                    </div>

                  </div>

                  {/* Benefit 3 */}
                  <div className="flex items-center gap-4">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                      <CheckCircle2
                        className="text-teal-300"
                        size={21}
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        Protected Information
                      </h3>

                      <p className="text-sm text-slate-400">
                        Your account information stays protected.
                      </p>
                    </div>

                  </div>

                </div>

                <p className="text-xs text-slate-500">
                  © 2026 MediCare Healthcare Services
                </p>

              </div>

            </div>

            {/* ================= RIGHT SIDE ================= */}
            <div className="bg-white p-6 text-slate-800 sm:p-10 lg:p-12">

              {/* Header */}
              <div className="mb-8">

                <div className="mb-5 flex items-center gap-2 text-sm font-medium text-teal-600">

                  <span className="h-2 w-2 rounded-full bg-teal-500" />

                  PATIENT REGISTRATION

                </div>

                <h2 className="text-3xl font-bold text-slate-900">
                  Create your account
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Enter your details to get started with MediCare.
                </p>

              </div>

              {/* ================= ERROR ================= */}
              {error && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* ================= SUCCESS ================= */}
              {success && (
                <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
                  {success}
                </div>
              )}

              {/* ================= FORM ================= */}
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Full Name */}
                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Full Name
                  </label>

                  <div className="relative">

                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      name="full_name"
                      value={form.full_name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                    />

                  </div>

                </div>

                {/* Email + Phone */}
                <div className="grid gap-5 sm:grid-cols-2">

                  {/* Email */}
                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Email
                    </label>

                    <div className="relative">

                      <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                      />

                    </div>

                  </div>

                  {/* Phone */}
                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Phone
                    </label>

                    <div className="relative">

                      <Phone
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                      />

                    </div>

                  </div>

                </div>

                {/* Age + Gender */}
                <div className="grid gap-5 sm:grid-cols-2">

                  {/* Age */}
                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Age
                    </label>

                    <div className="relative">

                      <Calendar
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="number"
                        name="age"
                        value={form.age}
                        onChange={handleChange}
                        min="1"
                        max="120"
                        placeholder="Your age"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                      />

                    </div>

                  </div>

                  {/* Gender */}
                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Gender
                    </label>

                    <div className="relative">

                      <VenusAndMars
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <select
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                      >

                        <option value="">
                          Select gender
                        </option>

                        <option value="male">
                          Male
                        </option>

                        <option value="female">
                          Female
                        </option>

                        <option value="other">
                          Other
                        </option>

                      </select>

                    </div>

                  </div>

                </div>

                {/* Password */}
                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <div className="relative">

                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Create a secure password"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-12 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                  </div>

                  {/* Password Strength */}
                  {form.password && (
                    <div className="mt-3">

                      <div className="flex gap-1">

                        {[1, 2, 3].map((level) => (
                          <div
                            key={level}
                            className={`h-1 flex-1 rounded-full ${
                              level <= passwordStrength
                                ? "bg-teal-500"
                                : "bg-slate-200"
                            }`}
                          />
                        ))}

                      </div>

                      <p className="mt-1 text-xs text-slate-400">
                        {passwordStrength === 1
                          ? "Weak password"
                          : passwordStrength === 2
                          ? "Good password"
                          : "Strong password"}
                      </p>

                    </div>
                  )}

                </div>

                {/* Terms */}
                <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-500">

                  <input
                    type="checkbox"
                    required
                    className="mt-1 h-4 w-4 accent-teal-600"
                  />

                  <span>
                    I agree to the{" "}
                    <span className="font-medium text-teal-600">
                      Terms of Service
                    </span>{" "}
                    and{" "}
                    <span className="font-medium text-teal-600">
                      Privacy Policy
                    </span>
                  </span>

                </label>

                {/* Create Account */}
                <button
                  type="submit"
                  disabled={loading || googleLoading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 py-3.5 font-semibold text-white shadow-lg shadow-teal-600/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {loading ? (
                    "Creating account..."
                  ) : (
                    <>
                      Create Patient Account

                      <ArrowRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}

                </button>

              </form>

              {/* ================= DIVIDER ================= */}
              <div className="relative my-6">

                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>

                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-xs font-medium text-slate-400">
                    OR CONTINUE WITH
                  </span>
                </div>

              </div>

              {/* ================= GOOGLE ================= */}
              <button
                type="button"
                onClick={handleGoogleRegister}
                disabled={loading || googleLoading}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-3.5 font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
              >

                {googleLoading ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-teal-600" />

                    Connecting to Google...
                  </>
                ) : (
                  <>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#4285F4"
                        d="M21.35 12.23c0-.78-.07-1.53-.22-2.23H12v4.22h5.22a4.46 4.46 0 0 1-1.94 2.93v2.44h3.14c1.84-1.69 2.93-4.18 2.93-7.36z"
                      />

                      <path
                        fill="#34A853"
                        d="M12 21.5c2.63 0 4.84-.87 6.45-2.35l-3.14-2.44c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.3v2.52A9.75 9.75 0 0 0 12 21.5z"
                      />

                      <path
                        fill="#FBBC05"
                        d="M6.54 13.61A5.86 5.86 0 0 1 6.23 12c0-.56.1-1.1.31-1.61V7.87H3.3A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.06 1.05 4.13l3.24-2.52z"
                      />

                      <path
                        fill="#EA4335"
                        d="M12 6.36c1.43 0 2.72.49 3.73 1.45l2.8-2.8C16.84 3.42 14.63 2.5 12 2.5a9.75 9.75 0 0 0-8.7 5.37l3.24 2.52C7.31 8.08 9.46 6.36 12 6.36z"
                      />
                    </svg>

                    Continue with Google
                  </>
                )}

              </button>

              {/* Mobile Login */}
              <p className="mt-7 text-center text-sm text-slate-500 lg:hidden">

                Already have an account?{" "}

                <Link
                  to="/login"
                  className="font-semibold text-teal-600"
                >
                  Sign in
                </Link>

              </p>

              {/* Security */}
              <div className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-400">

                <ShieldCheck size={15} />

                Your information is securely protected

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}