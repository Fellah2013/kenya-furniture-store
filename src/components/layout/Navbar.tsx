import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X, Phone, User, Search } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export const Navbar = () => {
  const { items, itemCount, total, updateQuantity, removeItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-20 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tighter text-primary">BELMONT</span>
          </Link>

          <div className="hidden md:flex gap-6">
            <Link to="/shop" className="text-sm font-medium hover:text-primary transition-colors">Shop</Link>
            <Link to="/services" className="text-sm font-medium hover:text-primary transition-colors">Services</Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
            <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center bg-muted px-3 py-1.5 rounded-full">
            <Search className="w-4 h-4 text-muted-foreground mr-2" />
            <input 
              placeholder="Search furniture..." 
              className="bg-transparent border-none text-sm focus:outline-none w-40"
            />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    {itemCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Your Shopping Cart ({itemCount})</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col h-full py-6">
                <ScrollArea className="flex-1 -mx-6 px-6">
                  {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                      <ShoppingCart className="w-12 h-12 mb-2 opacity-20" />
                      <p>Your cart is empty</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <img src={item.image} alt={item.name} className="h-20 w-20 rounded-md object-cover bg-muted" />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">KES {item.price.toLocaleString()}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
                              <span className="text-sm">{item.quantity}</span>
                              <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                              <Button variant="ghost" size="sm" className="ml-auto text-destructive h-7" onClick={() => removeItem(item.id)}>Remove</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
                <div className="pt-6 space-y-4">
                  <Separator />
                  <div className="flex items-center justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>KES {total.toLocaleString()}</span>
                  </div>
                  <Button className="w-full h-12 text-lg" disabled={items.length === 0} onClick={() => {
                    setIsOpen(false);
                    navigate("/checkout");
                  }}>
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Button variant="ghost" size="icon" className="hidden md:flex">
            <User className="w-5 h-5" />
          </Button>

          <Button variant="outline" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-background px-4 py-6 space-y-4">
          <Link to="/shop" className="block text-lg font-medium" onClick={() => setIsOpen(false)}>Shop</Link>
          <Link to="/services" className="block text-lg font-medium" onClick={() => setIsOpen(false)}>Services</Link>
          <Link to="/about" className="block text-lg font-medium" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/contact" className="block text-lg font-medium" onClick={() => setIsOpen(false)}>Contact</Link>
          <Separator />
          <div className="flex items-center gap-2 text-primary font-medium">
            <Phone className="w-4 h-4" />
            <span>+254 700 000 000</span>
          </div>
        </div>
      )}
    </nav>
  );
};