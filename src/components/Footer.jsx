import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative bg-warm-ivory overflow-hidden pt-6 pb-6 border-t border-cloud-grey/50">
      {/* Background circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-soft-gold rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-deep-mocha rounded-full blur-3xl opacity-20 animate-pulse"></div>

      {/* Footer content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <p className="text-cloud-grey text-sm text-left w-full md:w-auto">
          © {new Date().getFullYear()}{" "}
          <span className="text-soft-gold font-semibold">PurseShop</span> — Crafted with love for elegant women.
        </p>

        <div className="flex gap-4">
          {[
            {
              label: "Instagram",
              path: "M7.75 2A5.75 5.75 0 002 7.75v8.5A5.75 5.75 0 007.75 22h8.5A5.75 5.75 0 0022 16.25v-8.5A5.75 5.75 0 0016.25 2h-8.5zm0 1.5h8.5A4.25 4.25 0 0120.5 7.75v8.5a4.25 4.25 0 01-4.25 4.25h-8.5A4.25 4.25 0 013.5 16.25v-8.5A4.25 4.25 0 017.75 3.5zm8.25 2a.75.75 0 100 1.5.75.75 0 000-1.5zm-4.25 2a4.75 4.75 0 100 9.5 4.75 4.75 0 000-9.5zm0 1.5a3.25 3.25 0 110 6.5 3.25 3.25 0 010-6.5z",
            },
            {
              label: "Facebook",
              path: "M13.5 9H16V6h-2.5c-2.2 0-3.5 1.3-3.5 3.5V12H8v3h2v7h3v-7h2.3l.7-3H13V9.5c0-.3.2-.5.5-.5z",
            },
            {
              label: "Twitter",
              path: "M22.46 6c-.77.35-1.6.58-2.46.69a4.25 4.25 0 001.88-2.34 8.27 8.27 0 01-2.65 1.02 4.14 4.14 0 00-7.12 3.78A11.75 11.75 0 013 5.15a4.15 4.15 0 001.28 5.52 4.1 4.1 0 01-1.87-.52v.05a4.16 4.16 0 003.32 4.07 4.16 4.16 0 01-1.86.07 4.16 4.16 0 003.89 2.9A8.32 8.32 0 012 19.54a11.73 11.73 0 006.29 1.84c7.55 0 11.68-6.26 11.68-11.68v-.53A8.3 8.3 0 0022.46 6z",
            },
          ].map((icon) => (
            <a
              key={icon.label}
              href="#"
              aria-label={icon.label}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-warm-ivory shadow-sm border border-soft-gold hover:bg-soft-gold hover:text-warm-ivory transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-4 h-4"
              >
                <path d={icon.path} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
