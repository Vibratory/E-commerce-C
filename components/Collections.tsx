import { getCollections } from "@/lib/actions/actions";
import Image from "next/image";
import Link from "next/link";

const Collections = async () => {
  const collections = await getCollections();

  return (
    <div className="flex flex-col md:text-center  gap-8 py-5 px-1">

      <div className="md:flex md:justify-center px-2">

        <p className=" text-[#fdf3e8] text-heading1-bold font-tsukimi-rounded bg-[#67bac0] rounded-br-[40px] pb-4 pt-2    md:w-fit md:px-5  rounded-bl-[40px] max-md:text-center max-sm:text-heading2-bold max-md:pb-3">
          Catégories
        </p>
      </div>

      

      {!collections || collections.length === 0 ? (
        <p className="text-body-bold">No categories found</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-6">
          {collections.map((collection: CollectionType) => (
            <Link
              href={`/collections/${collection._id}`}
              key={collection._id}
              className="w-full max-w-[200px] md:max-w-[250px] lg:max-w-[280px]"
            >
              <Image
                src={collection.image}
                alt={collection.title}
                width={280}
                height={160}
                className="w-full rounded-lg cursor-pointer hover:shadow-bottom-only-hover object-cover transition-transform duration-300 ease-out hover:-translate-y-2"
              />
            </Link>
          ))}
        </div>


      )}
    </div>
  );
};

export default Collections;
