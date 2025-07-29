import { getProducts } from "@/lib/actions/actions";
import ProductCard from "./ProductCard";

const getRandomProducts = (products: ProductType[], count: number) => {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const ProductList = async () => {
  const products = await getProducts();
  const visibleProducts = products?.filter((product: ProductType) => !product.hidden) || [];
  const randomProducts = getRandomProducts(visibleProducts, 8);

  return (
    <div className="flex flex-col text-center gap-8 py-8 px-5">
      <div className="md:flex md:justify-center px-2">

        <p className=" text-[#fdf3e8] text-heading1-bold font-tsukimi-rounded bg-[#67bac0] rounded-br-[40px] pb-4 pt-2    md:w-fit md:px-5  rounded-bl-[40px] max-md:text-center max-sm:text-heading2-bold max-md:pb-3">
          Meilleures ventes
        </p>
      </div>
      {randomProducts.length === 0 ? (
        <p className="text-body-bold">Aucun produit trouvé</p>
      ) : (
        <div className="w-full overflow-x-auto sm:overflow-visible md:px-10 md:ml-8">
          <div className="flex sm:grid sm:grid-cols-4  gap-8 snap-x snap-mandatory scroll-smooth sm:snap-none">{/** all cards */}
            {randomProducts.map((product: ProductType) => (
              <div
                key={product._id}
                className="snap-start shrink-0 w-[260px] sm:w-full"

              >   {/** one card */}
              
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
