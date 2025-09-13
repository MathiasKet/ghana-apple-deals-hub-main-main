
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <main className="flex-grow flex items-center justify-center bg-apple-gray py-20">
      <div className="text-center max-w-md px-4">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-xl text-apple-darkgray mb-8">
          We can't find the page you're looking for.
        </p>
        <Link to="/">
          <Button className="apple-button">
            Return to Home
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
