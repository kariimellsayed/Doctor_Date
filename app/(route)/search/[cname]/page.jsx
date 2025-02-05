"use client";

import DoctorsCard from "@/app/_components/DoctorsCard";
import GlobalApi from "@/app/_Utils/GlobalApi";
import React, { useEffect, useState } from "react";

const Page = ({ params }) => {
  const [cname, setCname] = useState(null);
  const [docCat, setDocCat] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then(({ cname }) => {
      setCname(cname);
      doctorsByCategory(cname);
    });
  }, [params]);

  const doctorsByCategory = (categoryName) => {
    setLoading(true);
    GlobalApi.getDoctorsByCategory(categoryName)
      .then((res) => setDocCat(res.data.data))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <div className="pl-10 pt-5">
        <h1 className="text-primary font-semibold text-xl">{cname}</h1>
      </div>
      <section className="padding-x py-10 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="border-[1px] rounded-lg p-3 animate-pulse bg-gray-200 h-[350px]"
              ></div>
            ))
          : docCat.map((doctor) => (
              <DoctorsCard key={doctor.id} doctor={doctor} />
            ))}
      </section>
    </>
  );
};

export default Page;
