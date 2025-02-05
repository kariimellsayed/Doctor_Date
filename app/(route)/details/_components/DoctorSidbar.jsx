"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import GlobalApi from "@/app/_Utils/GlobalApi";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const DoctorSidebar = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllDoctors();
  }, []);

  const getAllDoctors = () => {
    GlobalApi.getDoctors()
      .then((res) => {
        setDoctors(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
        setLoading(false);
      });
  };

  return (
    <aside className="bg-white p-6 rounded-lg">
      <h3 className="text-2xl font-bold text-primary mb-6">
        Suggested Doctors
      </h3>

      {loading ? (
        <div className="p-4 rounded-lg w-full h-auto animate-pulse bg-gray-400"></div>
      ) : (
        <div className="flex flex-col gap-6">
          {doctors.map((doctor) => (
            <div
              className="flex items-center sm:flex-row flex-col  gap-4 p-4 h-auto bg-gray-50 hover:bg-gray-100 transition rounded-lg shadow-sm"
              key={doctor.id}
            >
              <Image
                src={doctor?.image?.url || "/placeholder.jpg"}
                alt="doctor-img"
                width={80}
                height={80}
                className="object-cover w-16 h-16 rounded-full border-2 border-primary"
              />
              <div>
                <h3 className="text-xs font-bold text-gray-800">
                  {doctor?.Name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {doctor.category?.Name || "Category not available"}
                </p>
                <Link
                  href={`/details/${doctor?.documentId}`}
                  className="flex-center"
                >
                  <Button className="mt-3">View</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
};

export default DoctorSidebar;
