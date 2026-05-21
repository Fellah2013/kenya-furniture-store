import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { products, categories } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get("cat");
  
  const [category, setCategory] = useState<string>(initialCat || "All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => (category === "All" || p.category === category))
      .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "newest") return b.newArrival ? 1 : -1;
        return 0;
      });
  }, [category, searchQuery, sortBy, priceRange]);

  const FilterContent = () => (
    <div className="space-y-8">
      <div>
        <h4 className="font-bold mb-4 uppercase text-xs tracking-wider">Categories</h4>
        <div className="flex flex-col gap-2">
          {["All", ...categories.map(c => c.name)].map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`text-left text-sm py-1.5 transition-colors ${category === cat ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h4 className="font-bold mb-4 uppercase text-xs tracking-wider">Price Range (KES)</h4>
        <div className="flex gap-4">
          <Input 
            type="number" 
            placeholder="Min" 
            className="h-10"
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
          />
          <Input 
            type="number" 
            placeholder="Max" 
            className="h-10"
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || 500000])}
          />
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="font-bold mb-4 uppercase text-xs tracking-wider">Materials</h4>
        <div className="flex flex-wrap gap-2">
          {["Wood", "Leather", "Metal", "Fabric", "Marble"].map(m => (
            <Badge key={m} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              {m}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Shop All Furniture</h1>
          <p className="text-muted-foreground">Find the perfect pieces for your unique space.</p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 bg-muted/30 p-4 rounded-xl">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search products..." 
              className="pl-10 h-11 bg-background" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden flex-1 h-11">
                  <Filter className="w-4 h-4 mr-2" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="py-8">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48 h-11 bg-background">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest Arrivals</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-12">
          {/* Sidebar (Desktop) */}
          <aside className="hidden lg:block w-64 shrink-0">
            <FilterContent />
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="bg-muted p-6 rounded-full mb-6">
                  <Search className="w-12 h-12 opacity-20" />
                </div>
                <h3 className="text-xl font-bold">No products found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your filters or search query.</p>
                <Button variant="link" onClick={() => {
                  setCategory("All");
                  setSearchQuery("");
                  setPriceRange([0, 500000]);
                }}>Clear all filters</Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <div className="mt-16 flex justify-center">
                  <Button variant="outline" size="lg" className="px-12">Load More</Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Internal Badge since it might not be exported from components/ui
const Badge = ({ children, variant, className, ...props }: any) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variant === 'outline' ? 'border border-border text-foreground' : 'bg-primary text-primary-foreground'} ${className}`} {...props}>
    {children}
  </span>
);

export default Shop;