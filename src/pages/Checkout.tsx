import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Truck, CreditCard, Landmark, Smartphone, ArrowLeft } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("mpesa");

  const shippingFee = 2500;
  const finalTotal = total + shippingFee;

  const handlePlaceOrder = () => {
    toast.success("Order placed successfully! We will contact you shortly.");
    clearCart();
    navigate("/");
  };

  if (items.length === 0 && step < 3) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Button onClick={() => navigate("/shop")}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Step Indicators */}
          <div className="flex items-center justify-between relative max-w-sm mx-auto">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -translate-y-1/2 z-0" />
            <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${step >= 1 ? "bg-primary border-primary text-white" : "bg-background border-muted"}`}>
              {step > 1 ? <Check className="w-5 h-5" /> : "1"}
            </div>
            <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${step >= 2 ? "bg-primary border-primary text-white" : "bg-background border-muted"}`}>
              {step > 2 ? <Check className="w-5 h-5" /> : "2"}
            </div>
            <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${step >= 3 ? "bg-primary border-primary text-white" : "bg-background border-muted"}`}>
              3
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input placeholder="+254 700 000 000" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Email Address</Label>
                  <Input type="email" placeholder="john@example.com" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Delivery Address (Street, Apartment, Floor)</Label>
                  <Input placeholder="Westlands, Rhapta Road, Block B-12" />
                </div>
                <div className="space-y-2">
                  <Label>City / Town</Label>
                  <Input placeholder="Nairobi" />
                </div>
                <div className="space-y-2">
                  <Label>County</Label>
                  <Input placeholder="Nairobi" />
                </div>
              </div>
              <Button size="lg" className="w-full h-14" onClick={() => setStep(2)}>Continue to Payment</Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div className="flex items-center gap-2 mb-4">
                <Button variant="ghost" size="sm" onClick={() => setStep(1)}><ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
              </div>
              <h2 className="text-2xl font-bold">Payment Method</h2>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid gap-4">
                <Label
                  htmlFor="mpesa"
                  className={`flex items-center justify-between p-6 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'mpesa' ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/20'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Smartphone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold">M-Pesa</p>
                      <p className="text-sm text-muted-foreground">Fastest and easiest way to pay in Kenya</p>
                    </div>
                  </div>
                  <RadioGroupItem value="mpesa" id="mpesa" className="sr-only" />
                  {paymentMethod === 'mpesa' && <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"><Check className="w-4 h-4 text-white" /></div>}
                </Label>

                <Label
                  htmlFor="card"
                  className={`flex items-center justify-between p-6 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/20'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <CreditCard className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold">Credit / Debit Card</p>
                      <p className="text-sm text-muted-foreground">Secure payment via Visa or Mastercard</p>
                    </div>
                  </div>
                  <RadioGroupItem value="card" id="card" className="sr-only" />
                  {paymentMethod === 'card' && <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"><Check className="w-4 h-4 text-white" /></div>}
                </Label>

                <Label
                  htmlFor="bank"
                  className={`flex items-center justify-between p-6 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'bank' ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/20'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Landmark className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold">Bank Transfer</p>
                      <p className="text-sm text-muted-foreground">EFT or Wire transfer to our local account</p>
                    </div>
                  </div>
                  <RadioGroupItem value="bank" id="bank" className="sr-only" />
                  {paymentMethod === 'bank' && <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"><Check className="w-4 h-4 text-white" /></div>}
                </Label>
              </RadioGroup>

              {paymentMethod === 'mpesa' && (
                <div className="bg-muted/50 p-6 rounded-2xl space-y-4">
                  <h4 className="font-bold">M-Pesa Payment Instructions</h4>
                  <ol className="text-sm space-y-2 list-decimal list-inside text-muted-foreground">
                    <li>Go to Lipa na M-Pesa on your phone</li>
                    <li>Select Pay Bill and enter Business No: <strong>123456</strong></li>
                    <li>Enter Account No: <strong>BELMONT_ORDER</strong></li>
                    <li>Enter Amount: <strong>KES {finalTotal.toLocaleString()}</strong></li>
                    <li>Enter your M-Pesa PIN and send</li>
                  </ol>
                </div>
              )}

              <Button size="lg" className="w-full h-14" onClick={handlePlaceOrder}>Place Order</Button>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="bg-card border rounded-3xl p-8 space-y-6 sticky top-24">
            <h3 className="text-xl font-bold">Order Summary</h3>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="h-16 w-16 bg-muted rounded-xl overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold line-clamp-1">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    <p className="text-sm">KES {(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>KES {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping (Nairobi)</span>
                <span>KES {shippingFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-4">
                <span>Total</span>
                <span className="text-primary">KES {finalTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-4">
              <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <Truck className="w-5 h-5 text-primary" />
                <p className="text-xs">Estimated delivery by: <br /><strong>{new Date(Date.now() + 5*24*60*60*1000).toLocaleDateString()}</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;