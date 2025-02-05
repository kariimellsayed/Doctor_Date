"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import GlobalApi from "@/app/_Utils/GlobalApi";
import BookingList from "./_components/BookingList";
import SkeletonCard from "./_components/SkeletonCard"; // Loading Card With Animate Pulse
import { MdOutlineBookOnline } from "react-icons/md";

const MyBooking = () => {
  const { user } = useKindeBrowserClient();
  const [booking, setBooking] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      getBookingNow();
    }
  }, [user]);

  const getBookingNow = () => {
    GlobalApi.getUserBookingList(user?.email)
      .then((res) => setBooking(res.data.data))
      .catch((error) => console.error("Error fetching booking:", error))
      .finally(() => setIsLoading(false));
  };

  const filteredBookingList = (type) => {
    return booking.filter((item) =>
      type === "upcoming"
        ? new Date(item.Date) >= new Date()
        : new Date(item.Date) <= new Date()
    );
  };

  return (
    <section className="padding">
      <h1 className="text-3xl text-primary font-bold flex items-center gap-2">
        <span>
          <MdOutlineBookOnline />
        </span>
        My Booking
      </h1>
      <Tabs defaultValue="upcoming" className="w-full mt-10">
        <TabsList className="w-full flex items-center justify-start">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          {isLoading ? (
            <SkeletonCard />
          ) : (
            <BookingList
              bookingItems={filteredBookingList("upcoming")}
              expired={false}
              getBookingNow={getBookingNow}
            />
          )}
        </TabsContent>

        <TabsContent value="expired">
          {isLoading ? (
            <SkeletonCard />
          ) : (
            <BookingList
              bookingItems={filteredBookingList("expired")}
              expired={true}
              getBookingNow={getBookingNow}
            />
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default MyBooking;
