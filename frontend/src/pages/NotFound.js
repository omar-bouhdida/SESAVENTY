import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="text-9xl font-bold text-blue-800 mb-4">404</div>
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Page Not Found</h1>
      <p className="text-xl text-gray-600 mb-8 text-center max-w-md">
        We couldn't find the page you're looking for. The page may have been moved, deleted, or never existed.
      </p>
      <Link to="/">
        <Button variant="primary" size="lg">
          Return to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
