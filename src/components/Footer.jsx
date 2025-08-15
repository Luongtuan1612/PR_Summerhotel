import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & mô tả */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">SummerHotel</h2>
          <p className="text-gray-400">
            Trải nghiệm kỳ nghỉ tuyệt vời với dịch vụ cao cấp, không gian thoáng
            đãng và tầm nhìn hướng biển.
          </p>
        </div>

        {/* Menu nhanh */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Liên kết nhanh</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-white transition">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link to="/rooms" className="hover:text-white transition">
                Phòng
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>

        {/* Thông tin liên hệ */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Liên hệ</h3>
          <ul className="space-y-2 text-gray-400">
            <li>🏨 123 Đường Biển, Nha Trang</li>
            <li>📧 contact@summerhotel.com</li>
            <li>📞 +84 123 456 789</li>
          </ul>
        </div>

        {/* Mạng xã hội */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Theo dõi chúng tôi</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <Youtube size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 text-center py-4 text-gray-500 text-sm">
        © {new Date().getFullYear()} SummerHotel. All rights reserved.
      </div>
    </footer>
  );
}
