// import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { FaLocationDot, FaXTwitter } from "react-icons/fa6";
import { GrUpgrade } from "react-icons/gr";
import Appointment from "./Appointment";

const DoctorDetail = ({ doctor, isLoading }) => {
  const imageUrl = doctor?.image?.url;

  if (isLoading) {
    return (
      <section className="flex flex-col md:flex-row gap-6 md:gap-12 p-6 bg-white shadow-lg rounded-lg animate-pulse">
        {/* Placeholder for Doctor Image */}
        <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-gray-300 bg-gray-200" />

        {/* Placeholder for Doctor Info */}
        <div className="flex-1 space-y-4">
          <div className="h-8 bg-gray-300 rounded-md w-3/4" />
          <div className="h-6 bg-gray-300 rounded-md w-1/2" />
          <div className="h-6 bg-gray-300 rounded-md w-2/3" />
          <div className="h-6 bg-gray-300 rounded-md w-1/4" />
          <div className="h-20 bg-gray-300 rounded-md" />
          <div className="flex gap-3 mt-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full" />
            <div className="w-8 h-8 bg-gray-300 rounded-full" />
            <div className="w-8 h-8 bg-gray-300 rounded-full" />
            <div className="w-8 h-8 bg-gray-300 rounded-full" />
            <div className="w-8 h-8 bg-gray-300 rounded-full" />
          </div>
          <div className="h-10 bg-gray-300 rounded-full w-1/3 mt-5" />
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col md:flex-row gap-6 md:gap-12 p-6 bg-white shadow-lg rounded-lg">
      {/* Doctor Image */}
      <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="doctor-image"
            width={160}
            height={160}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
            <span>No Image</span>
          </div>
        )}
      </div>

      {/* Doctor Info */}
      <div className="flex-1">
        {/* Name */}
        <h3 className="sm:text-3xl text-xl font-bold text-primary">
          {doctor?.Name}
        </h3>
        {/* Year_of_Experience */}
        <h3 className="flex items-center gap-2 text-sm sm:text-lg text-gray-500 mt-5">
          <GrUpgrade className="text-primary" />
          <span>Year of Experience ({doctor?.Year_of_Experience})</span>
        </h3>
        {/* Location */}
        <h3 className="flex items-center gap-2 text-sm sm:text-lg text-gray-500 my-5">
          <FaLocationDot className="text-primary" />
          <span>{doctor?.Address}</span>
        </h3>
        {/* Category */}
        <span className="text-sm font-bold rounded-full bg-blue-100 text-primary px-4 py-1">
          {doctor?.category?.Name}
        </span>
        <p className="sm:text-base text-xs text-gray-600 mt-4">
          {doctor?.About || "No details available about this doctor."}
        </p>
        {/* Social */}
        <h3 className="text-sm font-semibold text-primary mt-5">
          Social Media:
        </h3>
        <div className="flex items-center flex-wrap gap-3 mt-3">
          <span className="w-25 h-25 flex-center p-2 rounded-full border-2 border-primary cursor-pointer bg-blue-50">
            <FaFacebookF className="text-primary" />
          </span>
          <span className="w-25 h-25 flex-center p-2 rounded-full border-2 border-primary cursor-pointer bg-blue-50">
            <FaInstagram className="text-primary" />
          </span>
          <span className="w-25 h-25 flex-center p-2 rounded-full border-2 border-primary cursor-pointer bg-blue-50">
            <FaWhatsapp className="text-primary" />
          </span>
          <span className="w-25 h-25 flex-center p-2 rounded-full border-2 border-primary cursor-pointer bg-blue-50">
            <FaLinkedinIn className="text-primary" />
          </span>
          <span className="w-25 h-25 flex-center p-2 rounded-full border-2 border-primary cursor-pointer bg-blue-50">
            <FaXTwitter className="text-primary" />
          </span>
        </div>
        <div>
          <Appointment doctor={doctor} />
        </div>
      </div>
    </section>
  );
};

export default DoctorDetail;
