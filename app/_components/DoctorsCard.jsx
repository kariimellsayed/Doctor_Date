import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";

const DoctorsCard = ({ doctor }) => {
  const imageUrl = doctor?.image?.url;

  if (!imageUrl) {
    return <div>Image not available</div>;
  }

  return (
    <Link
      href={`/details/${doctor?.documentId}`}
      className="border-[1px] rounded-lg p-3 transition-all hover:translate-y-2 hover:shadow-3xl relative"
    >
      <Image
        src={imageUrl}
        alt="image-doctor"
        width={500}
        height={300}
        className="w-full h-[300px] object-cover rounded-lg"
      />
      {/* <img src={doctor?.image?.url} alt="doctor-img" loading="lazy" /> */}
      <div className="mt-3 items-baseline flex flex-col gap-2">
        <h3 className="bg-blue-100 text-primary text-[10px] font-semibold rounded-full p-1 px-2">
          {doctor?.category?.Name}
        </h3>
        <h3 className="text-[18px] font-bold">{doctor?.Name}</h3>

        <h3 className="text-primary text-sm font-semibold">
          {doctor?.Year_of_Experience} Years
        </h3>
        <h3 className="text-gray-500 text-sm flex-center gap-1">
          <FaLocationDot />
          {doctor?.Address}
        </h3>
        <Link href={`/details/${doctor?.documentId}`} className="w-full">
          <Button className="w-full rounded-full">Book Now</Button>
        </Link>
      </div>
    </Link>
  );
};

export default DoctorsCard;
