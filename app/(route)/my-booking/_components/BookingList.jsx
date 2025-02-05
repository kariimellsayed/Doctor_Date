import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarAlt, FaRegClock } from "react-icons/fa";
import DeleteBooking from "./DeleteBooking";
import GlobalApi from "@/app/_Utils/GlobalApi";
import { toast } from "sonner";

const BookingList = ({ bookingItems, expired, getBookingNow }) => {
  const [isLoading, setIsLoading] = useState(false); // Loading

  // Delete Appointment
  const deleteAppointment = async (item) => {
    setIsLoading(true); // Start Loading

    try {
      const res = await GlobalApi.deleteBooking(item.documentId);
      if (res) {
        toast.success("This Appointment Has Been Deleted Successfully.");
        await getBookingNow();
      }
    } catch (error) {
      toast.error("Failed to delete the appointment. Please try again.");
      console.error("Error deleting booking:", error);
    } finally {
      setIsLoading(false); // Close Loading
    }
  };

  return (
    <div className="grid gap-4">
      {bookingItems.map((item, index) => {
        const doctor = item.doctor;
        const doctorImage = doctor.image?.url || "/placeholder.jpg";
        const bookingDate = new Date(item.Date).toLocaleDateString("en-US", {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
        });

        return (
          <Card
            key={index}
            className="flex items-center sm:flex-row flex-col gap-4 p-4 shadow-md border rounded-xl hover:shadow-lg transition-shadow duration-300"
          >
            {/* Doctor Image */}
            <div>
              <Image
                src={doctorImage}
                width={64}
                height={64}
                alt={doctor.Name}
                className="rounded-full w-20 h-20 object-cover"
              />
            </div>

            {/* Booking Details */}
            <CardContent className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold">{doctor.Name}</h3>
              <p className="text-sm text-gray-500">{doctor.About}</p>

              {/* Address */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FaLocationDot className="w-4 h-4 text-blue-500" />
                <span>{doctor.Address}</span>
              </div>

              {/* Time and Date */}
              <div className="flex items-center gap-4 mt-2 flex-wrap">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaCalendarAlt className="w-4 h-4 text-green-500" />
                  <span>{bookingDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaRegClock className="w-4 h-4 text-red-500" />
                  <span>{item.Time}</span>
                </div>
              </div>

              {/* Cancel Booking */}
              {!expired && (
                <div className="mt-4">
                  <DeleteBooking
                    onClickDelete={() => deleteAppointment(item)}
                    isLoading={isLoading} // تمرير حالة التحميل للمكون
                  />
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default BookingList;
