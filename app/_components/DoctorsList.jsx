import DoctorsCard from "./DoctorsCard";

const DoctorsList = ({ doctors }) => {
  return (
    <div
      className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6
                 px-4 sm:px-6 lg:px-8"
    >
      {doctors.length > 0
        ? doctors.map((doctor) => (
            <DoctorsCard key={doctor.id} doctor={doctor} />
          ))
        : // Skelton Effect
          [1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
            <div
              key={index}
              className="bg-slate-100 h-[300px] rounded-lg w-full animate-pulse"
            ></div>
          ))}
    </div>
  );
};

export default DoctorsList;
