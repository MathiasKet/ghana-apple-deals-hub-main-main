import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Product, ProductFilter } from '@/types/product';
import { getProducts, deleteProduct } from '@/services/productService';
import { toast } from 'sonner';
import { formatPrice } from '@/lib/utils';
import { 
  Loader2, 
  Edit, 
  Trash2, 
  Plus, 
  Search, 
  Filter, 
  ArrowUpDown, 
  AlertCircle,
  Package,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

const ITEMS_PER_PAGE = 10;

// Define categories based on your product types
const PRODUCT_CATEGORIES = [
  'iPhone',
  'iPad',
  'Mac',
  'Watch',
  'AirPods',
  'Accessories',
  'Other'
];

export const Products = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortField, setSortField] = useState<keyof Product>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch products with filters
  const { 
    data, 
    isLoading, 
    isError, 
    error,
    isFetching 
  } = useQuery({
    queryKey: ['products', { page, searchTerm, categoryFilter, sortField, sortOrder }],
    queryFn: () =>
      getProducts({
        page,
        search: searchTerm,
        category: categoryFilter === 'all' ? undefined : categoryFilter,
        sortBy: sortField,
        sortOrder,
        limit: ITEMS_PER_PAGE,
      }),
    keepPreviousData: true,
  });

  // Memoize derived values
  const { products = [], total = 0 } = data || {};
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const hasProducts = products.length > 0;
  const isFiltered = searchTerm || (categoryFilter && categoryFilter !== 'all');
  
  // Handle pagination
  const canGoBack = page > 1;
  const canGoNext = page < totalPages;

  // Delete product
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success('Product deleted successfully');
      // Invalidate the products query to refetch the list
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error: Error) => {
      toast.error(`Error deleting product: ${error.message}`);
    },
  });

  // Handle delete confirmation
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteMutation.mutate(id);
    }
  };
  
  const isDeleting = (id: string) => {
    return deleteMutation.isPending && deleteMutation.variables === id;
  };

  // Handle sorting
  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setPage(1);
  };

  // Get unique categories for filter
  const categories = ['all', ...new Set(products.map(p => p.category))];

  // Handle loading and error states
  if (isLoading && !data) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="flex flex-col space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load products. {error instanceof Error ? error.message : 'Please try again later.'}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground">
              Manage your product inventory and pricing
            </p>
          </div>
          <Button asChild>
            <Link to="/admin/products/new" className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Product Catalog</CardTitle>
              <CardDescription>
                {total} {total === 1 ? 'product' : 'products'} found
                {isFiltered && ' (filtered)'}
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-9 w-full md:w-[250px]"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
              <Select
                value={categoryFilter}
                onValueChange={(value) => {
                  setCategoryFilter(value);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4 opacity-50" />
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {PRODUCT_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Image</TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => {
                      if (sortField === 'name') {
                        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                      } else {
                        setSortField('name');
                        setSortOrder('asc');
                      }
                    }}
                  >
                    <div className="flex items-center">
                      Name
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                      {sortField === 'name' && (
                        <span className="ml-1 text-xs text-muted-foreground">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isFetching && !isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      <div className="flex items-center justify-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : hasProducts ? (
                  products.map((product) => (
                    <TableRow key={product.id} className="group">
                      <TableCell>
                        <div className="h-12 w-12 overflow-hidden rounded-md border">
                          <img
                            src={product.images?.[0] || '/placeholder.svg'}
                            alt={product.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/placeholder.svg';
                            }}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span className="font-medium group-hover:underline">
                            {product.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            SKU: {product.sku || 'N/A'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {product.category || 'uncategorized'}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatPrice(product.price)}
                      </TableCell>
                      <TableCell>{product.stock || 0}</TableCell>
                      <TableCell>
                        <Badge
                          variant={product.stock > 0 ? 'default' : 'destructive'}
                          className="capitalize"
                        >
                          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 p-0 hover:bg-muted"
                            asChild
                            title="Edit product"
                          >
                            <Link to={`/admin/products/edit/${product.id}`}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => {
                              if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
                                deleteMutation.mutate(product.id);
                              }
                            }}
                            disabled={deleteMutation.isLoading}
                            title="Delete product"
                          >
                            {deleteMutation.isLoading ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center space-y-2 py-8">
                        <Package className="h-12 w-12 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          {isFiltered
                            ? 'No products match your filters.'
                            : 'No products found. Get started by adding a new product.'}
                        </p>
                        {isFiltered ? (
                          <Button
                            variant="ghost"
                            onClick={() => {
                              setSearchTerm('');
                              setCategoryFilter('all');
                              setPage(1);
                            }}
                            className="mt-2"
                          >
                            Clear filters
                          </Button>
                        ) : (
                          <Button asChild className="mt-2">
                            <Link to="/admin/products/new">
                              <Plus className="mr-2 h-4 w-4" />
                              Add Product
                            </Link>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium">
                  {total === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1}
                </span> to{' '}
                <span className="font-medium">
                  {Math.min(page * ITEMS_PER_PAGE, total)}
                </span>{' '}
                of <span className="font-medium">{total}</span> products
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(1)}
                  disabled={!canGoBack || isFetching}
                  className="hidden sm:inline-flex"
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={!canGoBack || isFetching}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="w-20 text-center text-sm text-muted-foreground">
                  {page} / {Math.max(1, totalPages)}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={!canGoNext || isFetching}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(totalPages)}
                  disabled={!canGoNext || isFetching}
                  className="hidden sm:inline-flex"
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
