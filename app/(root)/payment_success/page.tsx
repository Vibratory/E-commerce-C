"use client"

import useCart from "@/lib/hooks/useCart";
import Link from "next/link";
import { useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { CheckmarkIcon } from "react-hot-toast";
import Footer from "@/components/Footer";

const SuccessfulPayment = () => {
  const params = useSearchParams();
  const orderId = params.get('orderId')
  const Name = params.get('name')



  const cart = useCart();

  useEffect(() => {
    cart.clearCart();
  }, []);

  return (

    <div className=" flex flex-col min-h-screen gap-5  items-center justify-center ">

      {orderId && Name ? (
        <div>
          <div className="flex flex-wrap gap-3 justify-center">

            <CheckmarkIcon />
            <p className="text-heading4-bold text-red-1  ">Merci pour votre achat </p>

          </div>

          <p className="text-body-semibold"> <br></br> Commande N°: {orderId}  <br></br> Nom : {Name} </p>
        </div>

      ) : ('')}

      <Link
        href="/"
        className="p-4 border text-base-bold bg-black text-white"
      >
        RETOUR À L'ACCUEIL  
            </Link>
 
    </div>
  );
};

export default SuccessfulPayment;
