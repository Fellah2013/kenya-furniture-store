export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  material: string;
  dimensions: string;
  stock: number;
  featured?: boolean;
  newArrival?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Royal Velvet Sectional",
    category: "Sofas",
    price: 85000,
    originalPrice: 95000,
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/19db1c6c-eb6a-415b-908f-cc862f319ddb/sofa-featured-d0a89374-1778843897975.webp",
    description: "Experience ultimate comfort with our Royal Velvet Sectional. Crafted with premium velvet and a solid oak frame, this sofa is the centerpiece your living room deserves.",
    material: "Velvet, Oak Wood",
    dimensions: "280cm x 160cm x 85cm",
    stock: 5,
    featured: true,
  },
  {
    id: "2",
    name: "Majestic Mahogany Bed",
    category: "Beds",
    price: 120000,
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/19db1c6c-eb6a-415b-908f-cc862f319ddb/bed-featured-c8663d0f-1778843899220.webp",
    description: "A timeless masterpiece. Hand-carved from genuine mahogany, this bed offers both luxury and durability for a lifetime of restful sleep.",
    material: "Mahogany Wood",
    dimensions: "King Size (180cm x 200cm)",
    stock: 3,
    featured: true,
    newArrival: true,
  },
  {
    id: "3",
    name: "Gold Accent Dining Set",
    category: "Dining Sets",
    price: 65000,
    originalPrice: 72000,
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/19db1c6c-eb6a-415b-908f-cc862f319ddb/dining-featured-9a616ac5-1778843899564.webp",
    description: "Dine in style with our 6-seater dining set featuring gold accents and a polished marble-top finish. Perfect for family gatherings.",
    material: "Marble, Metal, Velvet",
    dimensions: "180cm x 90cm",
    stock: 8,
    featured: true,
  },
  {
    id: "4",
    name: "Executive Oak Desk",
    category: "Office Furniture",
    price: 45000,
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/19db1c6c-eb6a-415b-908f-cc862f319ddb/office-featured-5009c0eb-1778843898178.webp",
    description: "Upgrade your workspace with this premium oak desk. Features built-in cable management and three spacious drawers.",
    material: "Oak Wood, Steel",
    dimensions: "150cm x 75cm x 76cm",
    stock: 12,
    newArrival: true,
  },
  {
    id: "5",
    name: "Rattan Patio Lounge",
    category: "Outdoor Furniture",
    price: 55000,
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/19db1c6c-eb6a-415b-908f-cc862f319ddb/outdoor-featured-f2216b64-1778843899473.webp",
    description: "Weather-resistant and stylish. This rattan lounge set is perfect for the Kenyan climate, offering comfort for your garden or balcony.",
    material: "Synthetic Rattan, Aluminum",
    dimensions: "Modular",
    stock: 6,
  },
  {
    id: "6",
    name: "Modern Leather Armchair",
    category: "Sofas",
    price: 32000,
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/19db1c6c-eb6a-415b-908f-cc862f319ddb/hero-living-room-695aa43b-1778843899219.webp",
    description: "A compact yet luxurious leather armchair that fits perfectly in any corner. Italian leather with walnut legs.",
    material: "Top-grain Leather, Walnut",
    dimensions: "85cm x 80cm x 90cm",
    stock: 15,
  }
];

export const categories = [
  { name: "Sofas", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800" },
  { name: "Beds", image: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&q=80&w=800" },
  { name: "Dining Sets", image: "https://images.unsplash.com/photo-1617806118233-18e1db207fa6?auto=format&fit=crop&q=80&w=800" },
  { name: "Office Furniture", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800" },
  { name: "Outdoor Furniture", image: "https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&q=80&w=800" },
];