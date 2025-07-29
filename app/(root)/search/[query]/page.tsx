import ProductCard from '@/components/ProductCard'
import { getSearchedProducts } from '@/lib/actions/actions'
import { SortedFiltered } from '@/components/FilterSortProducts'
import Footer from '@/components/Footer'

const SearchPage = async ({ params }: { params: { query: string } }) => {
  const searchedProducts = await getSearchedProducts(params.query)

  const decodedQuery = decodeURIComponent(params.query)

  return (
    <div className='px-10 py-5'>
      <p className='text-heading3-bold my-10'>Résultat pour la recherche : {decodedQuery}</p>
      {!searchedProducts || searchedProducts.length === 0 && (
        <p className='text-body-bold my-5'>Aucun résultat trouvé pour :</p>
      )}
      <div className='flex flex-wrap justify-between gap-16'>

        <SortedFiltered
          products={searchedProducts} />

    
      </div>
       
    </div>
  )
}

export const dynamic = "force-dynamic";

export default SearchPage