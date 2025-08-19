// src/pages/RoomDetail.jsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import roomsData from "../../public/data/rooms.json";
import formatPrice from "../utils/formatPrice";
import {
  ArrowLeft,
  MapPin,
  BedDouble,
  Users,
  Ruler,
  CheckCircle2,
  Star,
  Wifi,
  Tv,
  Snowflake,
  UtensilsCrossed,
  Car,
  ShowerHead,
  Dumbbell,
  Coffee,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Small utilities ---
const amenityIconMap = {
  wifi: Wifi,
  tv: Tv,
  air: Snowflake,
  "air conditioning": Snowflake,
  breakfast: UtensilsCrossed,
  parking: Car,
  shower: ShowerHead,
  gym: Dumbbell,
  coffee: Coffee,
  safe: ShieldCheck,
  clean: Sparkles,
};

function getAmenityIcon(label = "") {
  const key = label.toLowerCase();
  const matched = Object.keys(amenityIconMap).find((k) => key.includes(k));
  return matched ? amenityIconMap[matched] : CheckCircle2;
}

function Rating({ value = 4.6, count = 128 }) {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.5;
  const stars = Array.from({ length: 5 }).map((_, i) => {
    const filled = i < full || (i === full && hasHalf);
    return (
      <Star
        key={i}
        className={`w-4 h-4 ${filled ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    );
  });
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">{stars}</div>
      <span className="text-sm text-gray-500">
        {value.toFixed(1)} • {count} đánh giá
      </span>
    </div>
  );
}

function Breadcrumbs({ name }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm">
      <ol className="flex items-center gap-2 text-gray-500">
        <li>
          <Link to="/" className="hover:text-gray-700">
            Trang chủ
          </Link>
        </li>
        <li className="text-gray-300">/</li>
        <li className="font-medium text-gray-800 truncate max-w-[50vw]" title={name}>
          {name}
        </li>
      </ol>
    </nav>
  );
}

function Skeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-[300px] sm:h-[420px] w-full bg-gray-200 rounded-2xl" />
      <div className="mt-6 h-6 w-2/3 bg-gray-200 rounded" />
      <div className="mt-2 h-4 w-1/3 bg-gray-200 rounded" />
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-10 bg-gray-200 rounded" />
        ))}
      </div>
      <div className="mt-6 h-40 bg-gray-200 rounded" />
    </div>
  );
}

function Gallery({ image }) {
  return (
    <div>
      <div className="relative w-full h-[300px] sm:h-[420px] rounded-2xl overflow-hidden shadow-lg">
        <img src={image} alt="Ảnh phòng" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
    </div>
  );
}

function AmenityBadge({ label }) {
  const Icon = getAmenityIcon(label);
  return (
    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 shadow-sm">
      <Icon className="w-4 h-4 text-blue-600" />
      <span className="text-sm text-gray-700">{label}</span>
    </div>
  );
}

function FloatingBar({ price, roomId }) {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/80 backdrop-blur border-t border-gray-200 p-3 sm:p-4 lg:hidden">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div>
          <p className="text-xs text-gray-500">Giá từ</p>
          <p className="text-lg font-semibold text-blue-600">
            {formatPrice(price)} <span className="text-sm text-gray-500">/ đêm</span>
          </p>
        </div>
        <Link
          to={`/booking/${roomId}`}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium shadow hover:scale-[1.02] transition"
        >
          Đặt phòng
        </Link>
      </div>
    </div>
  );
}

export default function RoomDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Scroll to top when id changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const room = useMemo(() => roomsData.find((r) => r.id === Number(id)), [id]);

  if (!room) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Không tìm thấy phòng</h2>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow hover:scale-105 transition"
        >
          <ArrowLeft size={18} className="mr-2" />
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-6 sm:py-10 mt-[50px]">
      <Breadcrumbs name={room.name} />

      {/* Hero / Gallery */}
      <AnimatePresence mode="wait">
        {!room ? (
          <Skeleton />
        ) : (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <Gallery image={room.image} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content layout */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column */}
        <section className="lg:col-span-2 bg-white rounded-2xl shadow p-6 sm:p-8 space-y-8">
          {/* Title + location + rating */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{room.name}</h1>
            {room.location && (
              <div className="flex items-center text-gray-600 mt-2">
                <MapPin size={18} className="mr-1 text-blue-600" />
                {room.location}
              </div>
            )}
            <div className="mt-3">
              <Rating value={room.rating || 4.7} count={room.reviews || 132} />
            </div>
          </div>

          {/* Quick facts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {room.size && (
              <div className="flex items-center">
                <Ruler size={20} className="text-blue-600 mr-2" />
                <span className="text-gray-700">{room.size} m²</span>
              </div>
            )}
            {room.guests && (
              <div className="flex items-center">
                <Users size={20} className="text-blue-600 mr-2" />
                <span className="text-gray-700">Tối đa {room.guests} khách</span>
              </div>
            )}
            {room.bed && (
              <div className="flex items-center">
                <BedDouble size={20} className="text-blue-600 mr-2" />
                <span className="text-gray-700">{room.bed}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {room.description && <p className="text-gray-700 leading-relaxed">{room.description}</p>}

          {/* Amenities */}
          {room.amenities && room.amenities.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-4 text-gray-900">Tiện nghi nổi bật</h3>
              <div className="flex flex-wrap gap-3">
                {room.amenities.map((a, i) => (
                  <AmenityBadge key={`${a}-${i}`} label={a} />
                ))}
              </div>
            </div>
          )}

          {/* Policies */}
          {room.policies && room.policies.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-4 text-gray-900">Chính sách</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {room.policies.map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Right column: Booking box */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 bg-white rounded-2xl shadow p-6 space-y-4">
            <div>
              <p className="text-sm text-gray-500">Giá từ</p>
              <p className="text-2xl font-semibold text-blue-600">
                {formatPrice(room.price)} <span className="text-lg text-gray-500">/ đêm</span>
              </p>
            </div>
            <Link
              to={`/booking/${room.id}`}
              className="w-full inline-block mt-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-3 rounded-xl text-center font-medium shadow hover:scale-[1.02] transition"
            >
              Đặt phòng ngay
            </Link>
          </div>
        </aside>
      </div>

      {/* Gallery grid (secondary) */}
      {room.gallery && room.gallery.length > 0 && (
        <section className="mt-10">
          <h3 className="text-lg font-bold mb-4 text-gray-900">Hình ảnh khác</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {room.gallery.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Gallery ${index}`}
                loading="lazy"
                className="w-full h-32 object-cover rounded-xl shadow hover:scale-105 transition"
              />
            ))}
          </div>
        </section>
      )}

      {/* Floating booking bar on mobile */}
      <FloatingBar price={room.price} roomId={room.id} />
    </div>
  );
}
