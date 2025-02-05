import React from "react";

export const metadata = {
  title: "About Us | Doctor Date",
  description:
    "Learn more about Doctor Date, our mission, vision, and why you should choose us for your healthcare needs.",
};

const About = () => {
  const cards = [
    {
      title: "Our Vision",
      content:
        "To revolutionize the way people access healthcare by fostering trust and convenience.",
    },
    {
      title: "Our Mission",
      content:
        "To connect patients with experienced doctors in a few clicks, saving time and ensuring reliable care.",
    },
    {
      title: "Why Choose Us?",
      content:
        "With Doctor Date, you can find trusted doctors, read reviews, and book appointments easily, all on one platform.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-5xl text-center">
        <h1 className="text-4xl font-bold text-[#2563EB] mb-6">
          About Doctor Date
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-8">
          At Doctor Date, we believe in connecting patients with trusted
          healthcare professionals. Our mission is to make scheduling
          appointments with your favorite doctors seamless and efficient. Your
          health is our priority, and we are committed to providing an
          effortless platform to access professional medical care.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-72"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {card.title}
              </h2>
              <p className="text-sm text-gray-600">{card.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
