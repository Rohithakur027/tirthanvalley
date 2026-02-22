import { galleryImages } from "@/data/galleryData";
import Breadcrumb from "@/components/Breadcrumb";
import GalleryClient from "./GalleryClient";

export default function GalleryPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col space-y-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Gallery" },
          ]}
        />
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl slide-up">
            Gallery
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto slide-up">
            Explore the beauty of Tirthan Valley through our collection of
            images
          </p>
        </div>

        <GalleryClient images={galleryImages} />
      </div>
    </div>
  );
}
