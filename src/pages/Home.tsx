import { Link } from "react-router-dom";
import heroImg from "../assets/landing image.png";
import { Button } from "../components/UI/Button";
export default function Home() {
  return (
    <div className="relative h-screen ">
      <img
        src={heroImg}
        alt="Hero Image "
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="container absolute inset-0 flex items-center ">
        <div className="">
          <h1 className="text-white mb-6 text-3xl md:text-4xl lg:text-5xl font-bold">
            Order your <span className="text-accent">favorite</span> food
          </h1>
          <p className="text-white/80 md:text-lg leading-7 max-w-[470px] mb-8">
            Experience gourmet flavors crafted with sustainably sourced, premium
            ingredients delivered directly to your doorstep.
          </p>
          <Link to="/menu">
            <Button size="default">Explore Menu</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
