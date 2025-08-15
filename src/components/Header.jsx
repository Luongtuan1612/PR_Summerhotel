import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHotel } from "react-icons/fa";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Lấy user từ localStorage
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    setUser(currentUser);
  }, []);

  // Xử lý scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    navigate("/");
  };

  const navItems = [
    { name: "Trang chủ", path: "/" },
    { name: "Phòng", path: "/rooms" },
    { name: "Liên hệ", path: "/contact" },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className={`flex items-center gap-2 text-2xl font-bold ${
            scrolled ? "text-blue-600" : "text-white"
          }`}
        >
          <FaHotel className="text-3xl" />
          SummerHotel
        </Link>

        {/* Menu desktop */}
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative text-lg font-medium transition-colors duration-300 ${
                pathname === item.path
                  ? "text-blue-600"
                  : scrolled
                  ? "text-gray-800"
                  : "text-white"
              }`}
            >
              {item.name}
              <motion.span
                className="absolute left-0 bottom-[-4px] h-[2px] bg-blue-500"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          ))}
        </nav>

        {/* Auth desktop */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <span
                className={`${
                  scrolled ? "text-gray-700" : "text-white"
                } whitespace-nowrap`}
              >
                Xin chào, <strong>{user.name}</strong>
              </span>
              <Link
                to="/profile"
                className="border border-blue-500 text-blue-500 px-3 py-1 rounded-lg hover:bg-blue-50 transition"
              >
                Tài khoản
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium hover:scale-105 transition-transform"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium hover:scale-105 transition-transform"
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>

        {/* Nút menu mobile */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <X size={28} className={scrolled ? "text-gray-800" : "text-white"} />
          ) : (
            <Menu size={28} className={scrolled ? "text-gray-800" : "text-white"} />
          )}
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div
          className={`md:hidden ${
            scrolled ? "bg-white" : "bg-white"
          } border-t border-gray-200`}
        >
          <nav className="flex flex-col space-y-4 p-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="hover:text-blue-500"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {user ? (
              <>
                <span className="text-gray-700">
                  Xin chào, <strong>{user.name}</strong>
                </span>
                <Link
                  to="/profile"
                  className="border border-blue-500 text-blue-500 px-3 py-1 rounded-lg hover:bg-blue-50"
                  onClick={() => setMenuOpen(false)}
                >
                  Tài khoản
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Đăng ký
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
