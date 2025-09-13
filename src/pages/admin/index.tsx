import { AdminLayout } from '../../components/admin/AdminLayout';
import { Dashboard } from './Dashboard';
import { Products } from './Products';
import { NewProduct } from './NewProduct';
import { EditProduct } from './EditProduct';

// Temporary components - replace with actual implementations
const Orders = () => <div className="p-6">Orders management coming soon</div>;
const Users = () => <div className="p-6">User management coming soon</div>;
const Settings = () => <div className="p-6">Settings management coming soon</div>;

export const AdminRoutes = [
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'products', element: <Products /> },
      { path: 'products/new', element: <NewProduct /> },
      { path: 'products/edit/:id', element: <EditProduct /> },
      { path: 'orders', element: <Orders /> },
      { path: 'users', element: <Users /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
];
