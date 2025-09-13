import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';

type NavItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/admin', icon: '📊' },
  { name: 'Products', href: '/admin/products', icon: '📱' },
  { name: 'Orders', href: '/admin/orders', icon: '📦' },
  { name: 'Users', href: '/admin/users', icon: '👥' },
  { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
      </div>
      <nav className="p-4 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              'flex items-center px-4 py-2 text-sm font-medium rounded-md',
              location.pathname === item.href
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            )}
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};
