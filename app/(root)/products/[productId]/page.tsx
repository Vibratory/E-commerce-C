import Footer from "@/components/Footer"
import Gallery from "@/components/Gallery"
import ProductCard from "@/components/ProductCard"
import ProductInfo from "@/components/ProductInfo"
import { getProductDetails, getRelatedProducts } from "@/lib/actions/actions"

const ProductDetails = async ({ params }: { params: { productId: string } }) => {
  const productDetails = await getProductDetails(params.productId)
  const relatedProducts = await getRelatedProducts(params.productId)

  return (
    <>
      <div className="flex justify-center items-start gap-16 py-10 px-5 max-md:flex-col max-md:items-center">

        <Gallery productMedia={productDetails.media} />
        <ProductInfo productInfo={productDetails} />

      </div>
      <p className="text-heading2-bold text-center ">Recommandé pour vous :</p>
      <div className="w-full overflow-x-auto sm:overflow-visible md:px-10 md:ml-8">
        <div className="flex sm:grid sm:grid-cols-4  gap-8 snap-x snap-mandatory scroll-smooth sm:snap-none">{/** all cards */}
          {relatedProducts.map((product: ProductType) => (
            <div
              key={product._id}
              className="snap-start shrink-0 w-[260px] sm:w-full"

            >   {/** one card */}

              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>


    </>
  )
}

export const dynamic = "force-dynamic";

export default ProductDetails