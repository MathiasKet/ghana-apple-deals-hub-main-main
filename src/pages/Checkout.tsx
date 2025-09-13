import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

interface ShippingDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  postalCode: string;
}

interface PaymentDetails {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { state: { items, total }, clearCart } = useCart();
  const shipping = items.length > 0 ? 25 : 0;
  const orderTotal = total + shipping;

  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    postalCode: '',
  });

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  // Redirect to cart if cart is empty
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Implement payment processing
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear the cart after successful order
      clearCart();
      
      // Navigate to order confirmation
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className={`flex items-center ${step === 'shipping' ? 'text-blue-600' : 'text-gray-600'}`}>
            <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-current">
              1
            </span>
            <span className="ml-2">Shipping</span>
          </div>
          <div className="w-16 h-1 mx-4 bg-gray-200" />
          <div className={`flex items-center ${step === 'payment' ? 'text-blue-600' : 'text-gray-600'}`}>
            <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-current">
              2
            </span>
            <span className="ml-2">Payment</span>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-4 rounded-lg mb-8">
          <h3 className="font-semibold mb-2">Order Summary</h3>
          <div className="space-y-1">
            {items.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} x {item.quantity}</span>
                <span>₵{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₵{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>₵{shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-semibold mt-2">
                <span>Total</span>
                <span>₵{orderTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {step === 'shipping' ? (
          <form onSubmit={handleShippingSubmit} className="space-y-6">
            <h2 className="text-2xl font-semibold mb-6">Shipping Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  required
                  value={shippingDetails.firstName}
                  onChange={(e) => setShippingDetails(prev => ({ ...prev, firstName: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  required
                  value={shippingDetails.lastName}
                  onChange={(e) => setShippingDetails(prev => ({ ...prev, lastName: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={shippingDetails.email}
                  onChange={(e) => setShippingDetails(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={shippingDetails.phone}
                  onChange={(e) => setShippingDetails(prev => ({ ...prev, phone: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  required
                  value={shippingDetails.address}
                  onChange={(e) => setShippingDetails(prev => ({ ...prev, address: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  required
                  value={shippingDetails.city}
                  onChange={(e) => setShippingDetails(prev => ({ ...prev, city: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                  Region
                </label>
                <input
                  type="text"
                  id="region"
                  required
                  value={shippingDetails.region}
                  onChange={(e) => setShippingDetails(prev => ({ ...prev, region: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  required
                  value={shippingDetails.postalCode}
                  onChange={(e) => setShippingDetails(prev => ({ ...prev, postalCode: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue to Payment
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handlePaymentSubmit} className="space-y-6">
            <h2 className="text-2xl font-semibold mb-6">Payment Details</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  required
                  value={paymentDetails.cardNumber}
                  onChange={(e) => setPaymentDetails(prev => ({ ...prev, cardNumber: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div>
                <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700">
                  Card Holder Name
                </label>
                <input
                  type="text"
                  id="cardHolder"
                  required
                  value={paymentDetails.cardHolder}
                  onChange={(e) => setPaymentDetails(prev => ({ ...prev, cardHolder: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    required
                    value={paymentDetails.expiryDate}
                    onChange={(e) => setPaymentDetails(prev => ({ ...prev, expiryDate: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    required
                    value={paymentDetails.cvv}
                    onChange={(e) => setPaymentDetails(prev => ({ ...prev, cvv: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep('shipping')}
                className="text-blue-600 hover:text-blue-700"
              >
                Back to Shipping
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Place Order
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Checkout; 