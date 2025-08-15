import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setUser(currentUser);
    setFormData({ name: currentUser.name, email: currentUser.email });

    const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const userBookings = allBookings.filter(
      (b) => b.email === currentUser.email
    );
    setBookings(userBookings);
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Cập nhật danh sách user
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.email === user.email ? { ...u, ...formData } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Cập nhật currentUser
    const updatedUser = { ...user, ...formData };
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    setUser(updatedUser);
    setEditing(false);
    alert("Cập nhật thông tin thành công!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Thông tin cá nhân</h1>

      {/* Thông tin cá nhân */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        {editing ? (
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled
              className="border border-gray-300 rounded-md px-4 py-2 w-full bg-gray-100"
            />
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Lưu
              </button>
              <button
                onClick={() => setEditing(false)}
                className="border border-gray-400 px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                Hủy
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p>
              <strong>Họ và tên:</strong> {user?.name}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <button
              onClick={() => setEditing(true)}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Chỉnh sửa
            </button>
          </div>
        )}
      </div>

      {/* Lịch sử đặt phòng */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Lịch sử đặt phòng</h2>
        {bookings.length > 0 ? (
          <ul className="space-y-3">
            {bookings.map((b, index) => (
              <li
                key={index}
                className="border border-gray-200 p-4 rounded-lg shadow-sm"
              >
                <p>
                  <strong>Phòng:</strong> {b.roomName}
                </p>
                <p>
                  <strong>Ngày nhận:</strong> {b.checkIn}
                </p>
                <p>
                  <strong>Ngày trả:</strong> {b.checkOut}
                </p>
                <p>
                  <strong>Giá:</strong> {b.price} VNĐ
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Bạn chưa có đơn đặt phòng nào.</p>
        )}
      </div>
    </div>
  );
}
