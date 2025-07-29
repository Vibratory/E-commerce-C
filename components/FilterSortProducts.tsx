"use client";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { boolean } from "zod/v4-mini";
import Footer from "./Footer";

type SortedFilteredProps = {
  products: ProductType[];
};

export const SortedFiltered = ({ products }: SortedFilteredProps) => {
  const [sortBy, setSortBy] = useState("default");
  const [filterByColor, setFilterByColor] = useState("all");
  const [filterBySize, setFilterBySize] = useState("all");
  const [filterByBrand, setFilterByBrand] = useState("all");
  const [filterBySale, setFilterBySale] = useState(false);
  const [filterBySubCategory, setFilterBySubCategory] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredProducts = products
    .filter((product) => filterByColor === "all" || product.colorVariants.some((c) => c.name === filterByColor))
    .filter((product) => filterBySize === "all" || product.colorVariants.some((c) => c.sizes.some((s) => s.name === filterBySize)))
    .filter((product) => filterByBrand === "all" || product.brand === filterByBrand)
    .filter((product) => filterBySubCategory === "all" || product.category === filterBySubCategory)
    .filter((product) => !filterBySale || product.solde === true)
    .sort((a, b) => {
      if (sortBy === "price-asc") return (a.newprice ?? a.price) - (b.newprice ?? b.price);
      if (sortBy === "price-desc") return (b.newprice ?? b.price) - (a.newprice ?? a.price);
      if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return 0;
    });

  const uniqueColors = Array.from(new Set(products.flatMap((p) => p.colorVariants.map((c) => c.name).filter(boolean))));
  const uniqueSizes = Array.from(new Set(products.flatMap((p) => p.colorVariants.flatMap((c) => c.sizes.map((s) => s.name).filter(boolean)))));
  const uniqueBrands = Array.from(new Set(products.map((p) => p.brand).filter(boolean)));
  const uniqueSubCategory = Array.from(new Set(products.map((p) => p.category).filter(boolean)));

  const FilterGroup = () => (
    <div className="flex flex-col gap-4 p-4 outline-[#242d3f] border-[#242d3f] border-solid">
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-2 rounded bg-[#fdf3e8]">
        <option value="default">Trier par</option>
        <option value="price-asc">Prix Croissant</option>
        <option value="price-desc">Prix Décroissant</option>
        <option value="newest">Nouveautés</option>
      </select>

      <select value={filterByColor} onChange={(e) => setFilterByColor(e.target.value)} className="px-3 py-2 rounded bg-[#fdf3e8]">
        <option value="all">Toutes les couleurs</option>
        {uniqueColors.map((color) => (
          <option key={color} value={color}>{color}</option>
        ))}
      </select>

      <select value={filterBySize} onChange={(e) => setFilterBySize(e.target.value)} className="px-3 py-2 rounded bg-[#fdf3e8]">
        <option value="all">Toutes les tailles</option>
        {uniqueSizes.map((size) => (
          <option key={size} value={size}>{size}</option>
        ))}
      </select>

      <select value={filterByBrand} onChange={(e) => setFilterByBrand(e.target.value)} className="px-3 py-2 rounded bg-[#fdf3e8]">
        <option value="all">Toutes les marques</option>
        {uniqueBrands.map((brand) => (
          <option key={brand} value={brand}>{brand}</option>
        ))}
      </select>

      <select value={filterBySubCategory} onChange={(e) => setFilterBySubCategory(e.target.value)} className="px-3 py-2 rounded bg-[#fdf3e8]">
        <option value="all">Toutes les sous-catégories</option>
        {uniqueSubCategory.map((subcat) => (
          <option key={subcat} value={subcat}>{subcat}</option>
        ))}
      </select>

      <label className="flex items-center space-x-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={filterBySale}
          onChange={(e) => setFilterBySale(e.target.checked)}
          className="h-4 w-4 accent-orange-500"
        />
        <span>Solde</span>
      </label>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Mobile filter button */}
      <div className="md:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-[#67bac0] text-white px-4 py-2 rounded mb-4"
        >
          {sidebarOpen ? "Fermer les filtres" : "Afficher les filtres"}
        </button>
        {sidebarOpen && (
          <div className="bg-white shadow-md rounded-md">{FilterGroup()}</div>
        )}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:block md:w-64">{FilterGroup()}</div>

      {/* Product Grid */}
<div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 w-full">
        {filteredProducts.map((product: ProductType) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      
    </div>
  );
};
