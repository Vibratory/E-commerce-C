import { zodResolver } from "@hookform/resolvers/zod";
import React, { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const checkoutSchema = z.object({
  name: z.string().min(3),
  number: z.string().min(10, "10 digits minimum").max(10, "10 digits max").regex(/^\d+$/, "Must be digits only"),
 email: z.string().email("Invalid email").optional().or(z.literal("")).transform((val) => (val === "" ? undefined : val)),
  state: z.string().nonempty("Field is required"),
  city: z.string().nonempty("Field is required"),
  zip: z.string().min(5, "5 digits minimum").max(5, "5 digits max").regex(/^\d+$/, "Must be digits only").optional().or(z.literal("")).transform((val) => (val === "" ? undefined : val)),
});

export type tcheckoutschema = z.infer<typeof checkoutSchema>;

type CheckoutFormProps = {
  getdata: (data: tcheckoutschema) => void;
};

const CheckoutForm = forwardRef(({ getdata }: CheckoutFormProps, ref) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<tcheckoutschema>({
    resolver: zodResolver(checkoutSchema),
  });

  useImperativeHandle(ref, () => ({
    submit: () => {
      handleSubmit((data) => {
        getdata(data);
        //reset(); 
      })();
    },
  }));

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-2">
        <input {...register("name")}
          placeholder="Nom et Prenom"
          className="rounded-md" />
        {errors.name &&
          <p className="text-red-600">
            {errors.name.message}
          </p>}

        <input {...register("number")}
          type="text"
          placeholder="Numero"
          className="rounded-md" />
        {errors.number &&
          <p className="text-red-600">
            {errors.number.message}</p>}

        <input {...register("email")}
          type="email"
          placeholder="E-mail"
          className="rounded-md" />
        {errors.email &&
          <p className="text-red-600">{errors.email.message}</p>}

        <input {...register("state")}
          placeholder="Wilaya"
          className="rounded-md" />
        <input {...register("city")}
          placeholder="Ville"
          className="rounded-md" />

        <input {...register("zip")}
          type="text"
          placeholder="Code Postale"
          className="rounded-md" />
        {errors.zip &&
          <p className="text-red-600">{errors.zip.message}</p>}
      </form>
    </div>
  );
});

CheckoutForm.displayName = "CheckoutForm";

export default CheckoutForm;
