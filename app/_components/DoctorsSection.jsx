"use client";
import { useEffect, useState } from "react";
import GlobalApi from "../_Utils/GlobalApi";
import DoctorsList from "./DoctorsList";

const DoctorsSection = () => {
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
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  };

  return (
    <div className="padding">
      <h1 className="text-2xl font-bold sm:text-3xl">Popular Doctors</h1>
      <DoctorsList doctors={doctors} />
    </div>
  );
};

export default DoctorsSection;
