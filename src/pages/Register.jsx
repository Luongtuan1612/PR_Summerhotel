import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Lấy danh sách user hiện tại
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check email đã tồn tại chưa
    if (users.some((u) => u.email === formData.email)) {
      alert("Email này đã được đăng ký!");
      return;
    }

    // Lưu user mới
    const newUser = { ...formData };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công! Vui lòng đăng nhập.");
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Đăng ký</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            value={formData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={formData.password}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:scale-105 transition w-full"
          >
            Đăng ký
          </button>
        </form>
        <p className="text-center text-gray-500 text-sm mt-4">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
