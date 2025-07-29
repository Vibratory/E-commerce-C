import Image from "next/image";
import { Instagram } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#77c0bf] text-white px-6 py-10 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Contact / About Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">À propos</h3>
          <p className="text-sm leading-relaxed">
            Bienvenue chez Boutika – la mode livrée jusqu’à votre porte. Retrouvez-nous au Rais Mall ou explorez notre boutique en ligne !          </p>

          <Link
            className="inline-flex items-center gap-2 text-white hover:opacity-80"
            target="_blank"
            href="https://www.instagram.com/boutika.brands/"
          >
            <Instagram className="w-5 h-5" />
            @boutika.brands
          </Link>
        </div>

        {/* Map */}
        <div className="w-full h-[100px] md:h-[200px] overflow-hidden rounded-xl ">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9919.187291941893!2d5.426885955776571!3d36.20058278713007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f315b602d7d4ab%3A0x659efa52e3d6d2e0!2sRais%20Mall!5e1!3m2!1sen!2sdz!4v1753446087974!5m2!1sen!2sdz"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="flex flex-col items-start gap-4">
          <Image
            src="/logo1.png"
            alt="Boutika Logo"
            width={100}
            height={100}
            className="rounded-lg"
          />
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Boutika – All rights reserved.
            <br />
            Designed by <Link href="https://www.instagram.com/oqtopoz/" target="_blank" className="font-bold">Oqtopoz</Link>  & Made by  <Link href="https://github.com/Vibratory" target="_blank" className="font-bold">Vibra</Link>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
