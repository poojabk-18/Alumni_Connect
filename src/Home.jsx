import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-300 via-yellow-200 to-teal-400 font-[Poppins]">
      <div className="w-[90%] max-w-6xl bg-gray-100 rounded-3xl shadow-2xl p-10 lg:p-16">

        <header className="flex justify-between items-center">
          <h1 className="text-teal-600 font-semibold tracking-wide">
            Alumni Connect
          </h1>

          <nav className="hidden md:flex items-center gap-8 text-gray-600 text-sm">
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/alumni">Alumni</Link>

            <Link to="/login">
              <button className="bg-yellow-400 hover:bg-yellow-500 px-5 py-2 rounded-full font-medium transition">
                LOG IN
              </button>
            </Link>
          </nav>
        </header>

        <section className="mt-16 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <h2 className="text-5xl lg:text-6xl font-bold text-green-900 leading-tight">
              Alumni <br /> Connect
            </h2>

            <p className="mt-6 text-gray-700 text-sm leading-relaxed">
              Reconnect with your alumni community.
              Discover mentorship, jobs, and new possibilities.
            </p>

            <Link to="/about">
              <button className="mt-8 bg-yellow-400 hover:bg-yellow-500 px-8 py-3 rounded-full font-medium transition">
                Learn More
              </button>
            </Link>
          </div>

          <div className="w-full lg:w-[450px]">
            <img
              src="https://media.istockphoto.com/id/1403347545/vector/man-looking-data-of-new-candidate.jpg?s=612x612&w=0&k=20&c=LDvoaYNUJdA7N5IGd6Md_aMf2cEjCGzp5r2n6TeekCM="
              alt="Illustration"
              className="w-full rounded-xl"
            />
          </div>
        </section>

      </div>
    </div>
  );
}

export default Home;