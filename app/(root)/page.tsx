import Collections from "@/components/Collections";
import Footer from "@/components/Footer";
import ProductList from "@/components/ProductList";

import Image from "next/image";

export default function Home() {
  return (
    <>
      <Image src="/last.png" alt="banner" width={2000} height={1000} className="block max-md:hidden  object-contain md:object-cover md:mb-10  " />

      {/**for small screens */}
      <Image src="/last1.png" alt="banner" width={2000} height={1000} className="block md:hidden object-contain mb-10 "

      />
      <div>
        <Collections />
        <ProductList />
      </div>

    </>
  );
}

export const dynamic = "force-dynamic";

