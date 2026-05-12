export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  span?: "wide" | "tall" | "square";
  category: "Landscape" | "People" | "Wildlife" | "Detail" | "Architecture";
}

export const gallery: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1588258524675-3fa3cb1052bd?auto=format&fit=crop&w=1800&q=80",
    alt: "Sigiriya rock at dawn",
    caption: "Sigiriya, first light",
    span: "tall",
    category: "Landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1581618017028-f9f10f0fb8c2?auto=format&fit=crop&w=1800&q=80",
    alt: "Tea plucker in the hill country",
    caption: "Hatton, mid-morning",
    span: "square",
    category: "People",
  },
  {
    src: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1800&q=80",
    alt: "Leopard at Yala",
    caption: "Yala, three minutes before sunset",
    span: "wide",
    category: "Wildlife",
  },
  {
    src: "https://images.unsplash.com/photo-1591635566278-12d0334ce05c?auto=format&fit=crop&w=1800&q=80",
    alt: "Galle Fort lighthouse",
    caption: "Galle, Saturday",
    span: "square",
    category: "Architecture",
  },
  {
    src: "https://images.unsplash.com/photo-1586804580207-1ce0b8731437?auto=format&fit=crop&w=1800&q=80",
    alt: "Tea estate at sunrise",
    caption: "Nuwara Eliya, before the bus",
    span: "wide",
    category: "Landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1800&q=80",
    alt: "Sigiriya summit view",
    caption: "From the top",
    span: "tall",
    category: "Landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1578507067149-b87de2c1f60d?auto=format&fit=crop&w=1800&q=80",
    alt: "East coast beach",
    caption: "Nilaveli, a Tuesday",
    span: "square",
    category: "Landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1577094945207-ec24cf2d36e2?auto=format&fit=crop&w=1800&q=80",
    alt: "Kandy temple lights",
    caption: "Temple of the Tooth, evening puja",
    span: "wide",
    category: "Architecture",
  },
  {
    src: "https://images.unsplash.com/photo-1583072117121-1c3ea58c5f1c?auto=format&fit=crop&w=1800&q=80",
    alt: "Beach villa pool",
    caption: "Tangalle, after lunch",
    span: "square",
    category: "Detail",
  },
  {
    src: "https://images.unsplash.com/photo-1559688636-72fe51adcde1?auto=format&fit=crop&w=1800&q=80",
    alt: "Coastal palms",
    caption: "Mirissa, the long way home",
    span: "wide",
    category: "Landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1582033922056-7826a5f1c873?auto=format&fit=crop&w=1800&q=80",
    alt: "Sigiriya water gardens",
    caption: "Pleasure gardens, fifth century",
    span: "tall",
    category: "Architecture",
  },
  {
    src: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1800&q=80",
    alt: "Elephant family at dusk",
    caption: "Minneriya tank",
    span: "square",
    category: "Wildlife",
  },
];
