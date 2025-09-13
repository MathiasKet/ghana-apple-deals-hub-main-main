import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface OrderDetails {
  orderId: string;
  date: string;
  total: number;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    region: string;
    postalCode: string;
  };
}

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    // TODO: Fetch order details from API
    // Mock data for now
    const mockOrder: OrderDetails = {
      orderId: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toLocaleDateString(),
      total: 1299.98,
      items: [
        {
          id: '1',
          name: 'iPhone 15 Pro',
          quantity: 1,
          price: 999.99,
        },
        {
          id: '2',
          name: 'AirPods Pro',
          quantity: 1,
          price: 299.99,
        },
      ],
      shippingAddress: {
        name: 'John Doe',
        address: '123 Main St',
        city: 'Accra',
        region: 'Greater Accra',
        postalCode: '00233',
      },
    };

    setOrder(mockOrder);
  }, []);

  if (!order) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-semibold">Order #{order.orderId}</h2>
                <p className="text-gray-600">Placed on {order.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-xl font-semibold">₵{order.total.toLocaleString()}</p>
              </div>
            </div>

            <div className="border-t border-b py-4 mb-4">
              <h3 className="font-semibold mb-3">Items Ordered</h3>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-medium">₵{item.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-3">Shipping Address</h3>
              <div className="text-gray-600">
                <p>{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.region}{' '}
                  {order.shippingAddress.postalCode}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                to="/"
                className="flex-1 bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue Shopping
              </Link>
              <button
                onClick={() => {
                  // TODO: Implement order tracking
                  navigate('/account/orders');
                }}
                className="flex-1 border border-blue-600 text-blue-600 text-center py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Track Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation; 