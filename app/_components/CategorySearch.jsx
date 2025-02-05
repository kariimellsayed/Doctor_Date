"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import GlobalApi from "../_Utils/GlobalApi";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CategorySearch = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // إضافة حالة تحميل

  useEffect(() => {
    getCategoriesList();
  }, []);

  const getCategoriesList = () => {
    setLoading(true); // تعيين حالة التحميل إلى true قبل بدء جلب البيانات
    GlobalApi.getCategories()
      .then((res) => setCategories(res.data.data))
      .finally(() => setLoading(false)); // تعيين حالة التحميل إلى false بعد تحميل البيانات
  };

  return (
    <section className="padding bg-gray-50">
      <div className="flex-coloumn text-center gap-2">
        <h1 className="text-4xl sm:text-7xl font-bold">
          Search <span className="text-primary">Doctors</span>
        </h1>
        <p className="mt-5 text-gray-500 text-md">
          Search Your Doctor and Book Appointment in one click
        </p>
        <div className="mt-4 flex w-full max-w-sm items-center space-x-2">
          <Input type="text" placeholder="Search..." />
          <Button type="submit" className="text-white font-bold">
            <FaSearch size={30} />
          </Button>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 phone:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {loading
          ? Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="bg-blue-100 h-[100px] mx-auto rounded-md w-[200px] animate-pulse"
              ></div>
            )) // عرض مربعات التحميل أثناء الجلب
          : categories.map((item) => (
              <Link
                href={`/search/${item.Name}`}
                key={item.documentId}
                className="px-3 py-5 text-center flex-coloumn bg-blue-100 rounded-md m-2 transition-all hover:scale-110 ease-in-out cursor-pointer"
              >
                <Image
                  src={item?.Icon?.url}
                  alt="img-category"
                  width={50}
                  height={50}
                />
                <label className="text-blue-600 sm:text-[18px] text-sm mt-4 font-semibold">
                  {item?.Name}
                </label>
              </Link>
            ))}
      </div>
    </section>
  );
};

export default CategorySearch;
