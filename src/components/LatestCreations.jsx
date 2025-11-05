import React from "react";

const LatestCreations = () => {
  const creations = [
    {
      title: "Elegant Evening Bags",
      description:
        "Crafted for memorable nights out, combining luxury and style in every stitch.",
      image:
        "https://cdn.pixabay.com/photo/2022/02/08/13/33/woman-7001401_1280.jpg",
    },
    {
      title: "Casual Day Purses",
      description:
        "Perfect for daily use, designed to carry your essentials with grace and charm.",
      image:
        "https://cdn.pixabay.com/photo/2024/11/24/14/58/girl-9221037_1280.jpg",
    },
    {
      title: "Luxury Tote Collection",
      description:
        "Spacious and stylish totes that make a statement wherever you go.",
      image:
        "https://cdn.pixabay.com/photo/2022/02/14/10/43/woman-7012888_1280.jpg",
    },
  ];

  return (
    <section className="relative py-20 bg-warm-ivory overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-soft-gold rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-deep-mocha rounded-full blur-3xl opacity-20 animate-pulse"></div>

      <div className="text-center mb-12 relative z-10">
        <h1 className="text-4xl md:text-5xl font-semibold text-deep-mocha">
          Our <span className="text-soft-gold">Latest Creations</span>
        </h1>
        <p className="text-base md:text-lg text-cloud-grey mt-4 max-w-2xl mx-auto">
          A visual collection of our most recent purses – each piece crafted
          with intention, elegance, and style.
        </p>
      </div>

      <div className="flex items-center gap-6 h-[400px] w-full max-w-7xl mt-10 mx-auto relative z-10">
        {creations.map((item, idx) => (
          <div
            key={idx}
            className="relative group flex-grow transition-all w-56 h-[400px] duration-500 hover:w-full rounded-2xl overflow-hidden shadow-lg"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-10 bg-pure-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <h1 className="text-3xl font-semibold text-soft-gold">{item.title}</h1>
              <p className="text-sm text-white mt-2">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestCreations;
