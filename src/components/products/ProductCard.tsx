import { Link } from "react-router-dom";
import { ShoppingCart, Eye, Heart } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-card rounded-xl overflow-hidden border transition-all hover:shadow-xl"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-[4/5] overflow-hidden relative">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.newArrival && (
              <Badge className="bg-primary text-primary-foreground border-none">New Arrival</Badge>
            )}
            {product.originalPrice && (
              <Badge variant="destructive" className="border-none">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </Badge>
            )}
          </div>
          
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <Button size="icon" variant="secondary" className="rounded-full">
              <Eye className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="secondary" className="rounded-full">
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="p-4 space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-widest">{product.category}</p>
          <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{product.name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">KES {product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">KES {product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          
          <Button 
            className="w-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity" 
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </Link>
    </motion.div>
  );
};