"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import useCart from "@/lib/hooks/useCart";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  CircleUserRound,
  Menu,
  Search,
  ShoppingCart,
} from "lucide-react";
import { getCollectionss } from "@/lib/actions/actions";



const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const cart = useCart();

  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [categoryMenu, setCategoryMenu] = useState(false);
  const [collections, setCollections] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchCollections = async () => {
      const result = await getCollectionss();
      setCollections(result);
    };
    fetchCollections();
  }, []);

  return (
    <div className="sticky top-0 z-30 py-2 px-10 flex gap-2 justify-between items-center max-sm:px-2 bg-[#77c0bf]">
      {/* Logo */}
      <Link href="/" className="max-md:hidden">
        <Image src="/logo1.png" alt="logo" width={130} height={100} />
      </Link>

      {/* Mobile Logo */}
       <Link href="/" className="lg:hidden md:hidden">
        <Image src="/logo-sm.png" alt="logo" width={70} height={90} />
      </Link>

      {/* Navigation links */}
      <div className="flex gap-4 text-base-bold max-lg:hidden">
        <Link
          href="/"
          className={`hover:text-[#29465b] text-white ${pathname === "/" ? "text-red-1" : ""}`}
        >
          Accueil

        </Link>

        {/* Category Menu */}
        <div className="relative ">
          <p
            className="cursor-pointer text-white hover:text-[#29465b]"
            onClick={() => setCategoryMenu(!categoryMenu)}
          >Catégories</p>
          {categoryMenu && (
            <div className="absolute top-12 right-0 flex flex-col gap-2 p-3 rounded-lg border bg-[#77c0bf] text-base-bold shadow-lg z-50">
              {collections.length === 0 ? (
                <p className="text-white">No categories found</p>
              ) : (
                collections.map((collection: CollectionType) => (
                  <Link
                    key={collection._id}
                    href={`/collections/${collection._id}`}
                    className="text-white hover:text-[#29465b]"
                  >
                    {collection.title}
                  </Link>
                ))
              )}
            </div>
          )}
        </div>

        <Link
          href={user ? "/wishlist" : "/sign-in"}
          className={`hover:text-[#29465b] text-white ${pathname === "/wishlist" ? "text-red-1" : ""}`}
        >
          Wishlist
        </Link>
        <Link
          href={user ? "/orders" : "/sign-in"}
          className={`hover:text-[#29465b] text-white ${pathname === "/orders" ? "text-red-1" : ""}`}
        >
          Commandes
        </Link>


      </div>

      {/* Search */}
      <div className="bg-white flex gap-3  px-3 py-1 items-center rounded-lg">
        <input
          className="outline-none max-sm:max-w-[120px]"
          placeholder="Rechercher..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          disabled={query === ""}
          onClick={() => router.push(`/search/${query}`)}
        >
          <Search className="cursor-pointer h-4 w-4 text-[#29465b]" />
        </button>
      </div>



      {/* Right-side: Cart + User */}
      <div className="relative flex gap-3 items-center">
        <Link
          href="/cart"
          className="flex items-center gap-3 rounded-lg px-2 py-1 hover:bg-[#29465b] hover:text-white"
        >
          <ShoppingCart className="text-white" />
          <p className="text-white text-base-bold">({cart.cartItems.length})</p>
        </Link>

        {/* Mobile menu */}
        <Menu
          className="cursor-pointer lg:hidden"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        />
        {dropdownMenu && (
          <div className="absolute top-12 right-5 flex flex-col gap-4 p-3 rounded-lg border bg-[#77c0bf] text-base-bold lg:hidden">
            <Link href="/" className="text-white hover:text-[#29465b]">Accueil
            </Link>
            <Link href={user ? "/wishlist" : "/sign-in"} className="text-white hover:text-[#29465b]">Wishlist</Link>
            <Link href={user ? "/orders" : "/sign-in"} className="text-white hover:text-[#29465b]">Commandes</Link>
            <Link href="/cart" className="flex items-center gap-3 rounded-lg px-2 py-1 hover:bg-[#29465b] hover:text-white">
              <ShoppingCart className="text-white" />
              <p className="text-white text-base-bold">Panier ({cart.cartItems.length})</p>
            </Link>
          </div>
        )}

        {/* User profile / login */}
        {user ? (
          <UserButton afterSignOutUrl="/sign-in" />
        ) : (
          <Link href="/sign-in">
            <CircleUserRound className="text-white" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
