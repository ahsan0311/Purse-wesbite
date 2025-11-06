// import React, { useState } from "react";

// const Testimonials = () => {
//   const [stopScroll, setStopScroll] = useState(false);

//   const testimonialData = [
//     {
//       title: "I fell in love with the craftsmanship!",
//       image:
//         "https://media.istockphoto.com/id/1271796113/photo/women-is-holding-handbag-near-luxury-car.webp?b=1&s=612x612&w=0&k=20&c=46lVdkNs9I8654pAKLuNIEWv7InXFC5XZfKgB47BD5k=",
//       name: "Sophia L.",
//     },
//     {
//       title: "Elegant designs for every occasion.",
//       image:
//         "https://cdn.pixabay.com/photo/2024/05/28/11/14/woman-8793611_1280.jpg",
//       name: "Emma R.",
//     },
//     {
//       title: "Luxury purses that turn heads.",
//       image:
//         "https://cdn.pixabay.com/photo/2024/04/29/17/19/girlie-8728461_1280.jpg",
//       name: "Olivia K.",
//     },
//     {
//       title: "Beautiful, stylish, and versatile.",
//       image:
//         "https://cdn.pixabay.com/photo/2017/08/10/01/52/girl-2617010_1280.jpg",
//       name: "Ava M.",
//     },
//   ];

//   return (
//     <section className="relative bg-warm-ivory py-20 overflow-hidden">
//       <div className="absolute top-0 left-0 w-64 h-64 bg-soft-gold rounded-full blur-3xl opacity-30 animate-pulse"></div>
//       <div className="absolute bottom-0 right-0 w-56 h-56 bg-soft-gold rounded-full blur-3xl opacity-20 animate-pulse"></div>

//       <div className="text-center mb-12 relative z-10">
//         <h2 className="text-3xl md:text-5xl font-semibold text-deep-mocha">
//           What Our <span className="text-soft-gold">Customers Say</span>
//         </h2>
//         <p className="text-cloud-grey mt-4 max-w-2xl mx-auto">
//           Hear from our delighted customers who have experienced the luxury and
//           elegance of our curated purse collection.
//         </p>
//       </div>

//       <div
//         className="overflow-hidden w-full relative max-w-7xl mx-auto z-10"
//         onMouseEnter={() => setStopScroll(true)}
//         onMouseLeave={() => setStopScroll(false)}
//       >
//         <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-warm-ivory/90 to-transparent" />
//         <div
//           className="marquee-inner flex w-fit"
//           style={{
//             animationPlayState: stopScroll ? "paused" : "running",
//             animationDuration: testimonialData.length * 2500 + "ms",
//           }}
//         >
//           <div className="flex">
//             {[...testimonialData, ...testimonialData].map((card, index) => (
//               <div
//                 key={index}
//                 className="w-64 mx-4 h-80 relative group rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300"
//               >
//                 <img
//                   src={card.image}
//                   alt="testimonial"
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-pure-black/20 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
//                   <p className="text-white font-semibold text-center mb-2">
//                     "{card.title}"
//                   </p>
//                   <p className="text-soft-gold font-medium text-center">
//                     - {card.name}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-warm-ivory/80 to-transparent" />
//       </div>

//       <style>{`
//         .marquee-inner {
//           display: flex;
//           animation: marqueeScroll linear infinite;
//         }

//         @keyframes marqueeScroll {
//           0% {
//             transform: translateX(0%);
//           }
//           100% {
//             transform: translateX(-50%);
//           }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Testimonials;



import React, { useState } from "react";
import { products } from "../data/products";
import { useNavigate } from "react-router-dom";

const Testimonials = () => {
  const [stopScroll, setStopScroll] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="relative bg-warm-ivory py-20 overflow-hidden">
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-3xl md:text-5xl font-semibold text-deep-mocha">
          Explore Our <span className="text-soft-gold">Bags</span>
        </h2>
        <p className="text-cloud-grey mt-4 max-w-2xl mx-auto">
          Click on any bag to see full details and purchase options.
        </p>
      </div>

      <div
        className="overflow-hidden w-full relative max-w-7xl mx-auto z-10"
        onMouseEnter={() => setStopScroll(true)}
        onMouseLeave={() => setStopScroll(false)}
      >
        <div
          className="marquee-inner flex w-fit"
          style={{
            animationPlayState: stopScroll ? "paused" : "running",
            animationDuration: products.length * 2500 + "ms",
          }}
        >
          {[...products, ...products].map((product, index) => (
            <div
              key={index}
              onClick={() => navigate(`/product/${product.id}`)}
              className="w-64 mx-4 h-80 relative group rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-pure-black/20 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white font-semibold text-center mb-2">
                  {product.name}
                </p>
                <p className="text-soft-gold font-medium text-center">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .marquee-inner {
          display: flex;
          animation: marqueeScroll linear infinite;
        }

        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
