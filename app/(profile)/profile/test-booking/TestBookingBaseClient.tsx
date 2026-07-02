"use client";

import { useState, useRef, useEffect } from "react";
import AOSProvider from "@/app/_components/AOSProvider";
import Calendar from "./Calendar";
import TimeSlot from "./TimeSlot";
import AppointmentDetails from "./AppointmentDetails";
import BookingHeader from "./BookingHeader";
import type { TranslationDict } from "@/app/_lib/booking-types";

interface TestBookingBaseClientProps {
  translations: TranslationDict;
}

export default function TestBookingBaseClient({
  translations,
}: TestBookingBaseClientProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const timeSlotRef = useRef<HTMLDivElement>(null);
  const appointmentDetailsRef = useRef<HTMLDivElement>(null);
  const [syncedHeight, setSyncedHeight] = useState("auto");

  // Redirect to error page if accessed without testId
  useEffect(() => {
    window.location.href = "/not-found";
  }, []);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date ?? null);
    setSelectedTime(null);
  };

  const handleTimeSelect = (timeSlot: { value: string }) => {
    setSelectedTime(timeSlot.value);
  };

  // Match both panels to the AppointmentDetails height
  useEffect(() => {
    let resizeTimeout: ReturnType<typeof setTimeout>;

    const updateHeightFromAppointment = () => {
      if (!appointmentDetailsRef.current || !timeSlotRef.current) return;

      const appointmentWrapper = appointmentDetailsRef.current;
      const timeSlotWrapper = timeSlotRef.current;

      // Measure AppointmentDetails natural height
      appointmentWrapper.style.height = "auto";
      const appointmentHeight = appointmentWrapper.scrollHeight;

      const targetHeight = `${appointmentHeight}px`;
      appointmentWrapper.style.height = targetHeight;
      timeSlotWrapper.style.height = targetHeight;
      setSyncedHeight(targetHeight);
    };

    const scheduleUpdate = (delay = 75) => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateHeightFromAppointment, delay);
    };

    scheduleUpdate(50); // initial run
    const handleResize = () => scheduleUpdate();
    window.addEventListener("resize", handleResize);

    const observer = new ResizeObserver(() => scheduleUpdate());
    if (appointmentDetailsRef.current) {
      observer.observe(appointmentDetailsRef.current);
    }

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, [selectedDate, selectedTime]);

  return (
    <AOSProvider>
      <div id="midd-wrapper">
        <section className="cmn-section lightgrey-bg screen20-first-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <BookingHeader currentStep={2} translations={translations} />

                <div className="test-booking-wrapper">
                  <div className="calendar-wrapper">
                    <Calendar
                      selectedDate={selectedDate}
                      currentMonth={currentMonth}
                      onSelect={handleDateSelect}
                      onMonthChange={setCurrentMonth}
                      translations={translations}
                    />
                  </div>
                  <div
                    ref={timeSlotRef}
                    style={{
                      height: syncedHeight,
                      transition: "height 0.3s ease",
                    }}
                  >
                    <TimeSlot
                      selectedDate={selectedDate}
                      selectedTime={selectedTime}
                      onTimeSelect={handleTimeSelect}
                      translations={translations}
                    />
                  </div>
                  <div
                    ref={appointmentDetailsRef}
                    style={{
                      height: syncedHeight,
                      transition: "height 0.3s ease",
                    }}
                  >
                    <AppointmentDetails
                      selectedDate={selectedDate}
                      selectedTime={selectedTime}
                      onPrevious={() => console.log("Previous clicked")}
                      onNext={() => console.log("Next clicked")}
                      translations={translations}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AOSProvider>
  );
}
