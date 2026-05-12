import { PageHero } from "@/components/shared/page-hero";
import { GalleryGrid } from "@/components/client/gallery-grid";
import { gallery } from "@/content/gallery";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Gallery",
  description:
    "Photographs from our private journeys across Sri Lanka — leopards in Yala, tea pluckers in Hatton, dawn at Sigiriya, golden hour in Galle Fort.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="The island, _slowly_ revealed."
        intro="An evolving collection of photographs taken on and around our journeys. Click any image to enlarge."
        image="https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=2880&q=85"
        imageAlt="Pre-dawn mist over the Sri Lankan jungle"
      />

      <section className="py-20 sm:py-28">
        <div className="container-luxe">
          <GalleryGrid gallery={gallery} />
        </div>
      </section>
    </>
  );
}
