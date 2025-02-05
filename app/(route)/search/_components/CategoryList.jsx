"use client";

import GlobalApi from "@/app/_Utils/GlobalApi";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // حالة التحميل
  const params = usePathname();
  const catPath = params.split("/")[2];

  useEffect(() => {
    getCategoriesList();
  }, []);

  const getCategoriesList = () => {
    setLoading(true);
    GlobalApi.getCategories()
      .then((res) => setCategories(res.data.data))
      .finally(() => setLoading(false));
  };

  return (
    <div className="h-screen flex flex-col mt-2 max-w-md mx-auto">
      <Command className="flex-1 bg-slate-50">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="mt-4 overflow-visible">
          {loading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="flex gap-2 items-center mt-2 animate-pulse px-3"
              >
                <div className="bg-gray-300 rounded-full w-6 h-10"></div>
                <div className="bg-gray-300 rounded-lg w-full h-10"></div>
              </div>
            ))
          ) : (
            <>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                {categories.map((cat) => (
                  <CommandItem key={cat.id} className="mt-2">
                    <Link
                      href={`/search/${cat.Name}`} // استخدم المسار المناسب هنا
                      className={`flex gap-2 text-[14px] text-blue-600 p-2 rounded-lg cursor-pointer
                       md:w-full ${catPath == cat.Name && `bg-blue-200`}`}
                    >
                      <Image
                        src={cat?.Icon?.url}
                        alt="icon-imag"
                        width={25}
                        height={25}
                      />
                      <label className="font-semibold max-phone:hidden">
                        {cat?.Name}
                      </label>
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </Command>
    </div>
  );
};

export default CategoryList;
