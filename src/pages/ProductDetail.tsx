import { useParams, useNavigate } from "react-router-dom";
import { Truck, ShieldCheck, Heart, Share2, Star, CheckCircle, ChevronLeft } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Button className="mt-4" onClick={() => navigate("/shop")}>Back to Shop</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product);
    toast.success("Added to cart!");
  };

  const handleBuyNow = () => {
    addItem(product);
    navigate("/checkout");
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <Button variant="ghost" className="mb-8 pl-0 hover:bg-transparent" onClick={() => navigate(-1)}>
        <ChevronLeft className="w-4 h-4 mr-2" /> Back to results
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Gallery */}
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-square bg-muted rounded-3xl overflow-hidden"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`aspect-square bg-muted rounded-xl overflow-hidden cursor-pointer border-2 transition-colors ${i === 1 ? "border-primary" : "border-transparent hover:border-primary/50"}`}>
                <img src={product.image} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-primary text-primary">{product.category}</Badge>
              {product.newArrival && <Badge className="bg-primary">New Arrival</Badge>}
              <div className="flex items-center gap-1 text-secondary ml-auto">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-bold text-foreground">4.8</span>
                <span className="text-xs text-muted-foreground">(24 reviews)</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{product.name}</h1>
            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-bold text-primary">KES {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">KES {product.originalPrice.toLocaleString()}</span>
              )}
            </div>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-muted/50 rounded-xl border border-muted">
              <p className="text-xs uppercase text-muted-foreground font-bold tracking-widest mb-1">Material</p>
              <p className="font-medium">{product.material}</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-xl border border-muted">
              <p className="text-xs uppercase text-muted-foreground font-bold tracking-widest mb-1">Dimensions</p>
              <p className="font-medium">{product.dimensions}</p>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4">
              <Button size="lg" className="flex-1 h-14 text-lg" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button size="icon" variant="outline" className="h-14 w-14 rounded-xl">
                <Heart className="w-6 h-6" />
              </Button>
            </div>
            <Button size="lg" variant="secondary" className="w-full h-14 text-lg" onClick={handleBuyNow}>
              Buy Now
            </Button>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Truck className="w-5 h-5 text-primary" />
              <span><strong>Fast Delivery:</strong> 3-5 working days in Nairobi, up to 7 days nationwide.</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span><strong>Guarantee:</strong> 24 months structural warranty.</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span><strong>Installation:</strong> Professional assembly included for Nairobi orders.</span>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <span className="text-sm font-medium text-muted-foreground">Share this:</span>
            <Button variant="ghost" size="icon" className="rounded-full"><Share2 className="w-4 h-4" /></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;