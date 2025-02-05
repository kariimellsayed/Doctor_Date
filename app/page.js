import CategorySearch from "./_components/CategorySearch";
import DoctorsSection from "./_components/DoctorsSection";
import Hero from "./_components/Hero";

const page = () => {
  return (
    <main>
      {/* Herp Section */}
      <Hero />
      {/* CategorySearch */}
      <CategorySearch />
      {/* Poplar Doctors */}
      <DoctorsSection />
    </main>
  );
};

export default page;
