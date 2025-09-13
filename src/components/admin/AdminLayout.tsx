import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { cn, getInitials } from '../../lib/utils';
import { LogOut, Menu, Package2, ShoppingCart, Users, LineChart, Settings, Home, Loader2, User, ChevronDown } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';
import { toast } from '../ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      navigate('/login');
      toast({
        title: 'Success',
        description: 'You have been logged out successfully.',
        variant: 'default',
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: 'Error',
        description: 'Failed to log out. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoggingOut(false);
      setShowLogoutDialog(false);
    }
  };

  const userInitials = currentUser?.email ? getInitials(currentUser.email) : 'AD';

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LineChart className="h-5 w-5" /> },
    { name: 'Products', path: '/admin/products', icon: <Package2 className="h-5 w-5" /> },
    { name: 'Orders', path: '/admin/orders', icon: <ShoppingCart className="h-5 w-5" /> },
    { name: 'Customers', path: '/admin/customers', icon: <Users className="h-5 w-5" /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* Mobile Header */}
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            to="/admin"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Ghana Apple Deals</span>
          </Link>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground',
                location.pathname === item.path && 'text-foreground bg-muted'
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-2 text-lg font-medium">
              <Link
                to="/admin"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span>Ghana Apple Deals</span>
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground',
                    location.pathname === item.path && 'bg-muted text-foreground'
                  )}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex w-full items-center justify-end gap-2">
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
            onClick={() => navigate('/')}
            title="View Site"
          >
            <Home className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-full px-2 rounded-full bg-background hover:bg-muted">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser?.photoURL || ''} alt={currentUser?.email || ''} />
                    <AvatarFallback className="text-xs">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-flex items-center gap-1 text-sm font-medium">
                    {currentUser?.email?.split('@')[0] || 'User'}
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User'}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {currentUser?.email || 'No email'}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/admin/settings')}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShowLogoutDialog(true)}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Logout Confirmation Dialog */}
        <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
              <AlertDialogDescription>
                You'll need to sign in again to access the admin dashboard.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isLoggingOut}>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isLoggingOut ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging out...
                  </>
                ) : (
                  'Log out'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <Outlet />
      </main>
    </div>
  );
};
