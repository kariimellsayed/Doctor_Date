"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { SlCalender } from "react-icons/sl";
import { IoMdTime } from "react-icons/io";
import { DialogClose } from "@radix-ui/react-dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import GlobalApi from "@/app/_Utils/GlobalApi";

const Appointment = ({ doctor }) => {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [slectedTimeSlot, setSlectedTimeSlot] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    getTime();
  }, []);

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({ time: i + ":00 AM" });
      timeList.push({ time: i + ":30 AM" });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({ time: i + ":00 AM" });
      timeList.push({ time: i + ":30 AM" });
    }
    setTimeSlot(timeList);
  };

  const isPastDay = (day) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return day < today;
  };

  const saveBooking = async () => {
    if (!user) {
      toast("Please log in to book an appointment.");
      return;
    }
    if (!doctor || !doctor.documentId) {
      toast("Doctor information is missing.");
      return;
    }
    if (!slectedTimeSlot) {
      toast("Please select a time slot.");
      return;
    }

    const bookingData = {
      data: {
        UserName: `${user.given_name} ${user.family_name}`,
        Email: user.email,
        Time: slectedTimeSlot,
        Date: date,
        doctor: doctor.documentId,
        Note: note,
      },
    };

    try {
      setLoading(true);
      const res = await GlobalApi.bookingAppointment(bookingData);
      if (res?.data) {
        toast("Booking is Created Successfully.");
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      toast("Failed to create appointment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="text-white text-lg font-semibold">Loading...</div>
        </div>
      )}
      <Dialog>
        <DialogTrigger>
          <Button className="rounded-full mt-5">Book Appointment</Button>
        </DialogTrigger>
        <DialogContent className="overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-primary font-bold">
              Doctor Appointment
            </DialogTitle>
            <DialogDescription>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3">
                <div>
                  <h2 className="text-sm text-gray-800 font-semibold flex items-center gap-2 mb-3">
                    <SlCalender className="text-primary" />
                    Select Date
                  </h2>
                  <Calendar
                    mode="single"
                    selected={date}
                    disabled={isPastDay}
                    onSelect={setDate}
                    className="rounded-md border shadow flex justify-center"
                  />
                </div>
                <div>
                  <h2 className="text-sm text-gray-800 font-semibold flex items-center gap-2 mb-3">
                    <IoMdTime className="text-primary" />
                    Select Time Slot
                  </h2>
                  <div className="grid grid-cols-3 gap-3 border rounded-lg p-5">
                    {timeSlot.map((item, index) => (
                      <h1
                        onClick={() => setSlectedTimeSlot(item.time)}
                        className={`${
                          item.time === slectedTimeSlot &&
                          "bg-primary text-white"
                        } text-center sm:text-sm text-[11px] p-2 border rounded-full cursor-pointer duration-200 hover:bg-primary hover:text-white`}
                        key={index}
                      >
                        {item.time}
                      </h1>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <Textarea
                  placeholder="Note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <div className="flex-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="text-red-500 border"
                >
                  Close
                </Button>
                <Button
                  type="button"
                  className="bg-primary"
                  disabled={!(date && slectedTimeSlot && doctor)}
                  onClick={saveBooking}
                >
                  Confirm
                </Button>
              </div>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Appointment;
