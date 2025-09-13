import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { getProducts } from '../../services/productService';
import { formatPrice } from '../../lib/utils';

export const Dashboard = () => {
  const { data: productsData, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts({}),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const totalProducts = productsData?.products.length || 0;
  const totalStock = productsData?.products.reduce((sum, p) => sum + (p.stock || 0), 0) || 0;
  const outOfStock = productsData?.products.filter(p => p.stock === 0).length || 0;
  const featuredProducts = productsData?.products.filter(p => p.featured).length || 0;
  const recentProducts = productsData?.products.slice(0, 5) || [];
  const topProducts = [...(productsData?.products || [])]
    .sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0))
    .slice(0, 5);

  const stats = [
    { 
      name: 'Total Products', 
      value: totalProducts.toString(),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
          <path d="M20 7h-4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
          <path d="M16 5V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1" />
          <path d="M4 7h4a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" />
        </svg>
      )
    },
    { 
      name: 'In Stock', 
      value: totalStock.toString(),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      )
    },
    { 
      name: 'Out of Stock', 
      value: outOfStock.toString(),
      change: outOfStock > 0 ? 'Needs attention' : 'All good',
      changeType: outOfStock > 0 ? 'decrease' : 'increase',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
          <path d="M12 14v4" />
          <path d="M10 18h4" />
        </svg>
      )
    },
    { 
      name: 'Featured', 
      value: featuredProducts.toString(),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      )
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {stat.name}
              </CardTitle>
              <div className="text-muted-foreground">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.change && (
                <p className={`text-xs ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
          </CardHeader>
          <CardContent>
            {recentProducts.length > 0 ? (
              <div className="space-y-4">
                {recentProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <div className="flex items-center space-x-3">
                      {product.images?.[0] ? (
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
                          className="h-10 w-10 rounded-md object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder.svg';
                          }}
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center">
                          <span className="text-xs text-gray-500">No image</span>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{formatPrice(product.price)}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No products found</p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Deals</CardTitle>
          </CardHeader>
          <CardContent>
            {topProducts.length > 0 ? (
              <div className="space-y-4">
                {topProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <div className="flex items-center space-x-3">
                      {product.images?.[0] ? (
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
                          className="h-10 w-10 rounded-md object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder.svg';
                          }}
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center">
                          <span className="text-xs text-gray-500">No image</span>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium">{product.name}</p>
                        {product.discountPercentage && product.discountPercentage > 0 ? (
                          <div className="flex items-center space-x-2">
                            <span className="text-xs line-through text-gray-500">
                              {formatPrice(product.price)}
                            </span>
                            <span className="text-xs font-medium text-green-600">
                              {product.discountPercentage}% off
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-500">No discount</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {product.discountPercentage && product.discountPercentage > 0
                          ? formatPrice(product.price * (1 - product.discountPercentage / 100))
                          : formatPrice(product.price)}
                      </p>
                      <span className="text-xs text-gray-500">
                        {product.stock} in stock
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No products with discounts</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
