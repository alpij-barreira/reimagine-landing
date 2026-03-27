import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import FabricGallery from "@/components/FabricGallery";
import Categories from "@/components/Categories";
import Manifesto from "@/components/Manifesto";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedProducts />
        <FabricGallery />
        <Categories />
        <Manifesto />
      </main>
      <Footer />
    </>
  );
}
