"use client"

import useCart from "@/lib/hooks/useCart"
import { useRef, useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { MinusCircle, PlusCircle, Trash } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { formatDZD, availability } from "@/lib/actions/actions"
import CheckoutForm, { tcheckoutschema } from "@/components/CheckoutForm"
import toast from "react-hot-toast"
import Link from "next/link"
import { Price } from "@/components/Price"
import Footer from "@/components/Footer"

const Cart = () => {
  const [shipInfo, setShipInfo] = useState<tcheckoutschema>()
  const router = useRouter()
  const { user } = useUser()
  const cart = useCart()
  const checkoutRef = useRef<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Total cart amount includes if on sale
  const total = cart.cartItems.reduce((acc, cartItem) => {

    const { price, newprice, solde } = cartItem.item;

    const effectivePrice = solde && newprice ? newprice : price;

    return acc + effectivePrice * cartItem.quantity;
  }, 0);


  const totalRounded = Number.parseFloat(total.toFixed(2))

  const customer = {
    clerkId: user?.id,
    email: user?.emailAddresses[0].emailAddress,
    name: user?.fullName,
  }

  const handleChildCheckoutClick = async () => {

    if (checkoutRef.current) {
      await checkoutRef.current.submit(); // we call the submit function in child component (form)

    }

  }

  const getdata = (data: tcheckoutschema) => { //get datd from child form
    setShipInfo(data)
    console.log("Final form data:", data);
    toast(data ? "Shipping info submitted" : "Please complete the form")
    //handleCheckout();

  }

  useEffect(() => {
    if (shipInfo) {
      handleCheckout();
    }
  }, [shipInfo]);


  const handleCheckout = async () => {
    const orderstatus = "New Order"
    setIsSubmitting(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        method: "POST",
        body: JSON.stringify({
          cartItems: cart.cartItems,
          customer,
          shipInfo,
          orderstatus,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await res.json()
      console.log("Checkout response:", data)
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      }
    } catch (err) {
      console.error("[checkout_POST] from front end", err)
    } finally {
      setIsSubmitting(false)
    }


  }

  const handleQuantityIncrease = (itemId: string, color?: string, size?: string) => {
    cart.increaseQuantity({ id: itemId, color, size })
  }

  const handleQuantityDecrease = (itemId: string, color?: string, size?: string) => {
    cart.decreaseQuantity({ id: itemId, color, size })
  }

  const handleRemove = (itemId: string, color?: string, size?: string, quantity?: number) => {


    if (quantity && quantity > 1) {

      const confirmed = confirm("Suprimer le produit du carte ? ")
      if (!confirmed) return
    }
    cart.removeItem({
      id: itemId,
      color,
      size
    })
    console.log('this 2', itemId, color, size)

  }

  return (
    <div className="flex gap-20 py-16 px-10 max-lg:flex-col max-sm:px-3">
      {/* Left Section */}
      <div className="w-2/3 max-lg:w-full">
        <div className="flex items-center justify-between">
          <p className="text-heading3-bold">Shopping Cart</p>
        </div>
        <hr className="my-6" />

        {cart.cartItems.length === 0 ? (
          <p className="text-body-bold">No items in cart</p>
        ) : (
          <div className="bg-white bg-opacity-20 rounded-md">

            {cart.cartItems.map((cartItem) => (
              <Link
                href={`/products/${cartItem.item._id}`}>
                <div
                  key={`${cartItem.item._id}-${cartItem.color}-${cartItem.size}`}
                  className="w-full flex max-sm:flex-col max-sm:gap-3 rounded-md hover:bg-white hover:bg-opacity-20 px-4 py-3 items-center max-sm:items-start justify-between"
                >
                  <div className="flex items-center">

                    <div className="relative z-10 overflow-hidden">

                      <Image
                        src={cartItem.item.media?.[0] || "/placeholder.svg"}
                        width={100}
                        height={100}
                        className="rounded-lg w-32 h-32 object-cover"
                        alt="product"
                      />
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded shadow-md z-10">
                        <p>-{Math.round(((Number(cartItem.item.price) - Number(cartItem.item.newprice)) / Number(cartItem.item.price)) * 100)} %</p>
                      </div>
                    </div>


                    <div className="flex flex-col gap-3 ml-4">
                      <p className="text-body-bold">{cartItem.item.title}</p>
                      {cartItem.color && <p className="text-small-medium">Couleur : {cartItem.color}</p>}
                      {cartItem.size && <p className="text-small-medium">Taille : {cartItem.size}</p>}
                      <p className="text-small-medium">Prix Unité :
                        <Price
                          price={cartItem.item.price}
                          solde={cartItem.item.solde}
                          newprice={cartItem.item.newprice}
                        /></p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex gap-4 items-center">
                    <MinusCircle
                      className="hover:text-red-1 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        handleQuantityDecrease(cartItem.item._id, cartItem.color, cartItem.size)
                      }}
                    />
                    <p className="text-body-bold">{cartItem.quantity}</p>
                    <PlusCircle
                      className="hover:text-red-1 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        handleQuantityIncrease(cartItem.item._id, cartItem.color, cartItem.size)
                      }
                      }
                    />
                  </div>

                  {/* Trash Button */}
                  <Trash
                    className="hover:text-red-1 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemove(
                        cartItem.item._id,
                        cartItem.color,
                        cartItem.size,
                        cartItem.quantity
                      );
                    }}
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="w-1/3 max-lg:w-full flex flex-col gap-8 bg-grey-1 bg-opacity-40 rounded-lg px-4 py-5">
        <p className="text-heading4-bold pb-4">
          Summary <span>{`(${cart.cartItems.length} ${cart.cartItems.length > 1 ? "items" : "item"})`}</span>
        </p>

        <div className="flex justify-between text-body-semibold">
          <span>Total : </span>
          <span>{formatDZD(totalRounded)}</span>
        </div>

        <CheckoutForm ref={checkoutRef} getdata={getdata} />
        {cart.cartItems.length !== 0 ? <button
          className="border rounded-lg text-body-bold hover:bg-[#72cc69] bg-[#ffc476] py-3 w-full  text-white disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleChildCheckoutClick}
          disabled={isSubmitting}
        >
          VALIDER LA COMMANDE
        </button>

          :

          <button
            className="border rounded-lg text-body-bold bg-red-600 py-3 w-full hover:bg-[#72cc69] text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Panier vide
          </button>}




        {/* For Debugging Only 
        <p>Shipping info: {JSON.stringify(shipInfo)}</p>*/}
      </div>

    </div>
  )
}

export default Cart
