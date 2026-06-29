"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface BookingData {
  testCenterId?: string | number;
  testType?: string;
  testTypeKey?: string;
}

export default function TestBookingPage() {
  const params = useParams<{ testCenterId: string }>();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("testBookingData");
      if (raw) {
        // Reading from sessionStorage must happen in an effect (not during SSR).
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setBookingData(JSON.parse(raw));
      }
    } catch (error) {
      console.error("[TestBookingPage] Failed to read booking data:", error);
    }
  }, []);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Test Booking</h1>
      <p className="text-gray-600 mb-2">
        Test Center ID: <strong>{params.testCenterId}</strong>
      </p>
      {bookingData ? (
        <div className="bg-gray-50 border rounded-lg p-4 mt-4">
          <p>
            <span className="font-medium">Test Type:</span>{" "}
            {bookingData.testType || "—"}
          </p>
          <p>
            <span className="font-medium">Test Type Key:</span>{" "}
            {bookingData.testTypeKey || "—"}
          </p>
          <p>
            <span className="font-medium">Test Center ID:</span>{" "}
            {bookingData.testCenterId || "—"}
          </p>
        </div>
      ) : (
        <p className="text-gray-500 mt-4">
          No booking data found in session storage.
        </p>
      )}
    </div>
  );
}
