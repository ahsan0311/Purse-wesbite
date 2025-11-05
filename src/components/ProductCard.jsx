import { useCart } from "../hooks/useCart";

export default function ProductCard({ product }) {
  const add = useCart((state) => state.add);

  return (
    <div className="group bg-warm-ivory rounded-2xl shadow-sm hover:shadow-soft-gold transition-all duration-300 overflow-hidden border border-cloud-grey">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Floating Add to Cart icon */}
        <button
          onClick={() => add(product)}
          className="absolute bottom-4 right-4 bg-deep-mocha hover:bg-soft-gold text-white p-3 rounded-full shadow-md transition-all"
          title="Add to Cart"
        >
          🛒
        </button>
      </div>

      {/* Details */}
      <div className="p-5 text-center">
        <h3 className="text-lg font-semibold text-deep-mocha group-hover:text-soft-gold transition">
          {product.name}
        </h3>
        <p className="text-sm text-cloud-grey mt-1">{product.category}</p>
        <p className="text-xl font-bold text-pure-black mt-3">
          ${product.price.toFixed(2)}
        </p>

        <button
          onClick={() => add(product)}
          className="mt-4 text-black inline-block bg-deep-mocha hover:bg-soft-gold  px-6 py-2 rounded-full font-medium transition-all shadow-md hover:shadow-soft-gold"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
