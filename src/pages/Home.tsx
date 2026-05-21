import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Star, Truck, ShieldCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products, categories } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { motion } from "framer-motion";

const Home = () => {
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  return (
    <div className="flex flex-col gap-0">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/19db1c6c-eb6a-415b-908f-cc862f319ddb/hero-living-room-695aa43b-1778843899219.webp" 
            alt="Luxury Interior" 
            className="w-full h-full object-cover brightness-[0.7]"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-white">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl space-y-6"
          >
            <span className="inline-block px-4 py-1.5 bg-primary/20 backdrop-blur-md border border-white/20 rounded-full text-sm font-medium tracking-widest uppercase">
              Premium Furniture in Kenya
            </span>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Transform Your Space with <span className="text-secondary">Elegant</span> Furniture
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-lg">
              Affordable luxury for your home, office, and commercial spaces. Nationwide delivery across Kenya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="h-14 px-8 text-lg" asChild>
                <Link to="/shop">Shop Collection <ArrowRight className="ml-2 w-5 h-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg bg-white/10 backdrop-blur-md border-white/40 hover:bg-white/20 hover:text-white" asChild>
                <Link to="/services">Our Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Floating Stat Banner */}
        <div className="absolute bottom-0 left-0 w-full bg-primary py-6 text-primary-foreground hidden lg:block">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Truck className="w-8 h-8 opacity-70" />
              <div>
                <p className="font-bold uppercase text-xs tracking-wider">Fast Delivery</p>
                <p className="text-sm opacity-90">Nationwide across Kenya</p>
              </div>
            </div>
            <div className="h-10 w-px bg-primary-foreground/20" />
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 opacity-70" />
              <div>
                <p className="font-bold uppercase text-xs tracking-wider">2 Year Warranty</p>
                <p className="text-sm opacity-90">Guaranteed quality products</p>
              </div>
            </div>
            <div className="h-10 w-px bg-primary-foreground/20" />
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 opacity-70" />
              <div>
                <p className="font-bold uppercase text-xs tracking-wider">Expert Assembly</p>
                <p className="text-sm opacity-90">Professional setup services</p>
              </div>
            </div>
            <div className="h-10 w-px bg-primary-foreground/20" />
            <div className="flex items-center gap-3 text-secondary">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <div>
                <p className="font-bold uppercase text-xs tracking-wider">5000+ Happy Clients</p>
                <p className="text-sm opacity-90 text-primary-foreground">Trusted by Kenyan homes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Browse by Category</h2>
            <p className="text-muted-foreground max-w-lg">Explore our diverse collections designed for every room in your home.</p>
          </div>
          <Button variant="ghost" asChild>
            <Link to="/shop" className="group">View All Categories <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={`/shop?cat=${cat.name}`} className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{cat.name}</h3>
                  <div className="h-1 w-0 bg-primary group-hover:w-full transition-all duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Best Sellers</h2>
            <p className="text-muted-foreground max-w-2xl">Our most popular pieces, handpicked for quality and style.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-3xl overflow-hidden aspect-video lg:aspect-square">
            <img 
              src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/19db1c6c-eb6a-415b-908f-cc862f319ddb/showroom-interior-52100c7a-1778843898759.webp" 
              alt="Showroom" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
          
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">What Our Clients Say</h2>
              <p className="text-muted-foreground">Hear from homeowners and business owners across Kenya who transformed their spaces with Belmont.</p>
            </div>
            
            <div className="space-y-8">
              <div className="bg-card p-8 rounded-2xl shadow-sm border">
                <div className="flex gap-1 text-secondary mb-4">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="italic text-lg mb-6 leading-relaxed">
                  "Belmont Furniture transformed our Nairobi apartment into a luxury sanctuary. The quality of the mahogany bed is exceptional, and delivery was prompt!"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center font-bold text-primary">JN</div>
                  <div>
                    <p className="font-bold">Jane Njeri</p>
                    <p className="text-sm text-muted-foreground">Westlands, Nairobi</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card p-8 rounded-2xl shadow-sm border">
                <div className="flex gap-1 text-secondary mb-4">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="italic text-lg mb-6 leading-relaxed">
                  "As an Airbnb host, style and durability are key. Belmont's sofas are not only stunning but hold up perfectly to constant use. Highly recommended!"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center font-bold text-primary">DK</div>
                  <div>
                    <p className="font-bold">David Koech</p>
                    <p className="text-sm text-muted-foreground">Mombasa Host</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold">Stay Inspired</h2>
          <p className="text-lg opacity-80">Get the latest design tips, new arrivals, and exclusive offers delivered to your inbox.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 h-12 rounded-full px-6 bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-secondary text-white"
            />
            <Button size="lg" className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 px-8">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;