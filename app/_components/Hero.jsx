import Image from "next/image";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="padding">
      <div className="mx-auto max-w-screen">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-8">
          <div>
            <div className="max-w-lg md:max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-5xl">
                Find & Book <span className="text-primary">Appointment </span>
                with Your Fav <span className="text-primary">Doctors</span>
              </h2>

              <p className="mt-5 text-gray-500">
                Discover a seamless way to connect with trusted doctors and
                schedule your appointments effortlessly. Your health is our
                priority, and we’re here to make accessing professional care
                easier and faster than ever before.
              </p>
            </div>
            <Button className="mt-5">Explore Now</Button>
          </div>

          <div className="max-md:order-first">
            <Image
              src={"/hero-banner.jpg"}
              loading="lazy"
              alt="hero"
              width={800}
              height={800}
              className="w-full h-full rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
