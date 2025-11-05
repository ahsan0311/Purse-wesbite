import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { products } from "../data/products";
import { useCart } from "../hooks/useCart";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id.toString() === id);

  const addToCart = useCart((state) => state.addToCart || state.add);

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product ? product.price : 0);

  useEffect(() => {
    if (product) setTotalPrice((product.price * quantity).toFixed(2));
  }, [quantity, product]);

  if (!product) {
    return <div className="text-center py-20">Product not found.</div>;
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  return (
    <section className="bg-warm-ivory py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-xl shadow-lg hover:scale-[1.02] transition-transform duration-300"
          />
          {product.extraImages && (
            <div className="flex gap-3">
              {product.extraImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${product.name} ${i}`}
                  className="w-24 h-24 object-cover rounded-lg border border-cloud-grey cursor-pointer hover:border-soft-gold hover:scale-105 transition-transform duration-200"
                />
              ))}
            </div>
          )}
        </div>

        <div className="text-deep-mocha">
          <h1 className="text-4xl font-bold mb-3">{product.name}</h1>

          <div className="flex items-center gap-4 mb-4">
            <p className="text-soft-gold text-3xl font-semibold">${totalPrice}</p>
           
          </div>

          <p className="mb-6 leading-relaxed text-lg">
            {product.description ||
              "A luxurious handcrafted item that blends elegance and durability, designed to elevate your look for any occasion."}
          </p>

          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Product Specifications:</h4>
            <ul className="list-disc list-inside space-y-1 text-base">
              <li>Material: {product.material || "Premium Leather"}</li>
              <li>Color: {product.color || "Tan"}</li>
              <li>Style: {product.style || "Biker / Modern"}</li>
              <li>Warranty: {product.warranty || "1 Year"}</li>
            </ul>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-lg font-medium">Quantity:</span>
            <div className="flex items-center border border-cloud-grey rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-lg font-semibold hover:bg-cloud-grey active:scale-95 transition-all"
              >
                −
              </button>
              <span className="px-6 py-2 text-lg font-semibold bg-white select-none">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-lg font-semibold hover:bg-cloud-grey active:scale-95 transition-all"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
  <button
    onClick={handleAddToCart}
    className="flex-1 px-8 py-3 bg-deep-mocha text-warm-ivory rounded-lg text-lg font-medium shadow-md
    hover:bg-soft-gold hover:text-deep-mocha hover:-translate-y-1 hover:shadow-lg
    active:scale-95 active:shadow-inner transition-all duration-300 ease-out"
  >
     Add to Cart
  </button>

  <button
    onClick={handleBuyNow}
    className="flex-1 px-8 py-3 border border-deep-mocha text-deep-mocha rounded-lg text-lg font-medium shadow-sm
    hover:bg-deep-mocha hover:text-warm-ivory hover:-translate-y-1 hover:shadow-lg
    active:scale-95 active:shadow-inner transition-all duration-300 ease-out"
  >
     Buy Now
  </button>
</div>

        </div>
      </div>
    </section>
  );
}
