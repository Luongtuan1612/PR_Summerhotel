import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="max-w-md mx-auto p-6 text-center bg-white shadow rounded-lg mt-10">
      <h1 className="text-2xl font-bold text-green-600">Thanh toán thành công!</h1>
      <p className="mt-2">Cảm ơn bạn đã đặt phòng tại SummerHotel.</p>
      <p>Mã đặt phòng của bạn: <strong>#{Math.floor(Math.random() * 100000)}</strong></p>
      <Link
        to="/"
        className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Quay về trang chủ
      </Link>
    </div>
  );
};

export default PaymentSuccess;
