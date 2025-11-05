import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

export default function Products() {
  return (
    <section className="py-20 bg-warm-ivory/90">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-semibold text-center mb-12 text-deep-mocha">
          Our <span className="text-soft-gold">Luxury Purses</span>
        </h1>

        <p className="text-center text-cloud-grey max-w-2xl mx-auto mb-14">
          Handcrafted elegance meets modern style. Explore our latest purse
          collection designed to make every moment special.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
