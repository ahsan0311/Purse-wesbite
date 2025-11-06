import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { products } from "../data/products";
import { useCart } from "../hooks/useCart";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../Firebase";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id.toString() === id);

  const addToCart = useCart((state) => state.addToCart || state.add);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product ? product.price : 0);

  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: "", rating: 5, comment: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!product) return;
    const q = query(
      collection(db, "products", product.id.toString(), "reviews"),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(list);
    });
    return () => unsubscribe();
  }, [product]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.comment) return;

    setLoading(true);
    try {
      await addDoc(
        collection(db, "products", product.id.toString(), "reviews"),
        {
          name: form.name,
          rating: Number(form.rating),
          comment: form.comment,
          timestamp: serverTimestamp(),
        }
      );
      setForm({ name: "", rating: 5, comment: "" });
    } catch (err) {
      console.error("Error adding review:", err);
    }
    setLoading(false);
  };

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
      {/* Product Card */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start border border-cloud-grey rounded-xl shadow-lg overflow-hidden ">
      
<div className="space-y-4 mt-2">
  <div className="w-full h-[400px] overflow-hidden rounded-xl shadow-md bg-[#C7A87B] p-4">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-full object-cover rounded-lg"
    />
  </div>

  {product.extraImages && (
    <div className="flex gap-3">
      {product.extraImages.map((img, i) => (
        <div
          key={i}
          className="w-24 h-24 overflow-hidden rounded-lg border border-cloud-grey cursor-pointer bg-[#C7A87B] p-1"
        >
          <img
            src={img}
            alt={`${product.name} ${i}`}
            className="w-full h-full object-cover rounded"
          />
        </div>
      ))}
    </div>
  )}
</div>


        {/* Product Info */}
        <div className="text-deep-mocha p-6 flex flex-col">
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

          {/* Quantity Selector */}
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

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-auto">
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

      {/* Reviews Section */}
      <div className="max-w-7xl mx-auto mt-20 border border-cloud-grey rounded-xl shadow-lg bg-white p-8">
        <h2 className="text-3xl font-bold text-deep-mocha mb-6 text-center">
          Customer Reviews
        </h2>

        {/* Review Form */}
        <form
          onSubmit={handleReviewSubmit}
          className="flex flex-col gap-4 mb-10 bg-white p-6 rounded-lg shadow-sm border border-cloud-grey"
        >
          <h3 className="text-xl font-semibold text-deep-mocha mb-2">
            Write a Review
          </h3>

          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border border-cloud-grey rounded-lg p-3 focus:outline-none text-deep-mocha"
          />

          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setForm({ ...form, rating: star })}
                className={`text-3xl transition-all duration-200 ${
                  star <= form.rating
                    ? "text-soft-gold scale-110"
                    : "text-cloud-grey hover:text-soft-gold"
                }`}
              >
                ★
              </button>
            ))}
            <span className="text-deep-mocha font-medium ml-2">
              {form.rating} / 5
            </span>
          </div>

          <textarea
            placeholder="Share your experience..."
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            className="border border-cloud-grey rounded-lg p-3 focus:outline-none text-deep-mocha"
            rows="4"
          />

          <button
            type="submit"
            disabled={loading}
            className="self-start border-2 border-soft-gold bg-soft-gold text-deep-mocha 
             px-8 py-3 rounded-lg font-semibold shadow-sm
             hover:bg-deep-mocha hover:text-warm-ivory hover:border-deep-mocha
             hover:-translate-y-[2px]
             active:scale-95 active:shadow-inner 
             transition-all duration-300 ease-out disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Post Review"}
          </button>
        </form>

        {/* Reviews List */}
        {reviews.length === 0 ? (
          <p className="text-deep-mocha text-center">
            No reviews yet. Be the first to share your thoughts!
          </p>
        ) : (
          <div className="space-y-6">
            {reviews.map((r) => (
              <div
                key={r.id}
                className="bg-white p-5 border border-cloud-grey rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-deep-mocha">{r.name}</p>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        className={`text-lg ${
                          s <= r.rating ? "text-soft-gold" : "text-cloud-grey"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-deep-mocha leading-relaxed">{r.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
