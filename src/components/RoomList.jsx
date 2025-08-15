// src/components/RoomList.jsx
export default function RoomList({ rooms }) {
  if (rooms.length === 0) {
    return <p className="text-center text-gray-500 mt-4">Không tìm thấy phòng phù hợp.</p>;
  }

  return (
    <div className="grid md:grid-cols-3 gap-6 mt-6">
      {rooms.map((room) => (
        <div key={room.id} className="border rounded-lg shadow hover:shadow-lg transition">
          <img src={room.image} alt={room.name} className="w-full h-48 object-cover rounded-t-lg" />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{room.name}</h3>
            <p className="text-gray-500">{room.description}</p>
            <p className="mt-2 font-bold text-blue-600">{room.price.toLocaleString()}₫ / đêm</p>
            <p className="text-sm text-gray-400">
              {room.capacityAdults} người lớn, {room.capacityChildren} trẻ em
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
