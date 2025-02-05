"use client";

import React, { useEffect, useState } from "react";
import GlobalApi from "@/app/_Utils/GlobalApi";
import DoctorDetail from "../_components/DoctorDetail";
import DoctorSidbar from "../_components/DoctorSidbar";

const Page = ({ params }) => {
  const [doctor, setDoctor] = useState({});
  const [loading, setLoading] = useState(true); // حالة التحميل

  // فك الـ params
  useEffect(() => {
    params.then(({ record }) => {
      getDoctorsByRecord(record);
    });
  }, [params]);

  // Fetch Doctor By Document
  const getDoctorsByRecord = (record) => {
    if (record) {
      setLoading(true);
      GlobalApi.getDoctorsByDocumentId(record)
        .then((res) => {
          setDoctor(res.data.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className="padding-x py-14">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
        {/* Doctors Details */}
        <div className="bg-white p-6 rounded-lg shadow-md col-span-3">
          <DoctorDetail doctor={doctor} isLoading={loading} />
        </div>

        {/* Doctors Sidebar */}
        <div className="bg-white rounded-lg shadow-md">
          <DoctorSidbar />
        </div>
      </div>
    </div>
  );
};

export default Page;
