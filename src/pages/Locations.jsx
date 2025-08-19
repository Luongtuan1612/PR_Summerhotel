// src/pages/Locations.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const hotels = [
  {
    id: 1,
    city: "Hà Nội",
    name: "Summer Hotel - Hà Nội",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  },
  {
    id: 2,
    city: "Đà Nẵng",
    name: "Summer Hotel - Đà Nẵng",
    image:
      "https://images.unsplash.com/photo-1501117716987-c8e2a6e0a98b?w=800&q=80",
  },
  {
    id: 3,
    city: "Vinh",
    name: "Summer Hotel - Vinh",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
  },
];

export default function Locations() {
  const navigate = useNavigate();

  // Khi click vào 1 khách sạn → chuyển sang trang Rooms với query ?location=city
  const handleClick = (city) => {
    navigate(`/rooms?location=${encodeURIComponent(city)}`);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh]">
        {/* Ảnh nền */}
        <img
          src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=1600&q=80"
          alt="Banner Locations"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Nội dung */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-bold"
          >
            Các địa điểm Summer Hotel
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-4 text-lg md:text-xl max-w-2xl"
          >
            Trải nghiệm kỳ nghỉ tuyệt vời tại những thành phố sôi động nhất Việt
            Nam với hệ thống khách sạn Summer Hotel.
          </motion.p>
        </div>
      </section>

      {/* Danh sách khách sạn */}
      <section className="py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-800"
          >
            Hệ thống khách sạn
          </motion.h2>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {hotels.map((hotel) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                onClick={() => handleClick(hotel.city)}
                className="cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
              >
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {hotel.name}
                  </h3>
                  <p className="text-gray-600 mt-2">{hotel.city}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
