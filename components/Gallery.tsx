"use client";

import Image from "next/image";
import React, { useState } from "react";

const Gallery = ({ productMedia }: { productMedia: string[] }) => {
  const [mainImage, setMainImage] = useState(productMedia[0]);

  return (
    <div className="flex flex-col md:flex-row-reverse gap-4 max-w-full md:max-w-[500px] w-full">
      {/* Main Image */}
      <Image
        src={mainImage}
        width={500}
        height={500}
        alt="product"
        className="w-full md:w-96 h-auto md:h-96 rounded-lg shadow-xl object-cover"
      />

      {/* Thumbnails */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:overflow-x-hidden max-w-full md:max-h-[400px] scrollbar-thin">
        {productMedia.map((image, index) => (
          <Image
            key={index}
            src={image}
            height={80}
            width={80}
            alt="product thumbnail"
            className={`w-20 h-20 min-w-[5rem] rounded-lg object-cover cursor-pointer ${
              mainImage === image ? "border-2 border-black" : ""
            }`}
            onClick={() => setMainImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
