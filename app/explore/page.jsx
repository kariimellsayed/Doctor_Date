import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const services = [
  {
    id: 1,
    title: "Online Consultation",
    description:
      "Connect with doctors online for a consultation from the comfort of your home.",
    image: "/online-cons.jpg",
  },
  {
    id: 2,
    title: "In-Person Appointment",
    description:
      "Book an in-person appointment with your favorite doctor for direct consultations.",
    image: "/appointment.jpg",
  },
  {
    id: 3,
    title: "Emergency Care",
    description:
      "Get emergency medical care in your area with our fast-track service.",
    image: "/emergency.jpg",
  },
  {
    id: 4,
    title: "Doctor Reviews",
    description:
      "Read reviews from other patients to make informed decisions about your doctor.",
    image: "/review.jpg",
  },
];

export const metadata = {
  title: "Explore | Doctor Date",
  description:
    "Discover our range of medical services, from online consultations to emergency care.",
};

const Explore = () => {
  return (
    <div className="padding bg-gray-50 min-h-screen px-4 py-12">
      {/* Title Section */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-[#2563EB] mb-4">
          Explore Our Services
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Discover a range of services designed to help you find and book your
          appointments with trusted doctors quickly and easily. Choose from our
          comprehensive offerings to get started.
        </p>
      </div>

      {/* Services Grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white shadow-xl rounded-lg overflow-hidden transition-all hover:translate-y-2"
          >
            <Image
              src={service.image}
              alt={service.title}
              width={500}
              height={500}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {service.title}
              </h2>
              <p className="text-gray-600 mb-4">{service.description}</p>

              <Button
                variant="outlet"
                className="text-primary font-semibold hover:text-white hover:bg-primary transition duration-300"
              >
                Learn More
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action Section */}
      <div className="text-center mt-12">
        <h2 className="text-3xl font-semibold text-[#2563EB] mb-4">
          Ready to find and book your appointment?
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Start exploring our services now and connect with trusted doctors.
        </p>
        <button className="bg-[#2563EB] text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Explore;
