import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">SESAVENTY</h3>
            <p className="text-gray-400">
              A platform for managing student clubs, events, and memberships.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
              <li><Link to="/clubs" className="text-gray-400 hover:text-white transition">Clubs</Link></li>
              <li><Link to="/events" className="text-gray-400 hover:text-white transition">Events</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-gray-400 hover:text-white transition">FAQ</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white transition">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><a href="https://facebook.com" className="text-gray-400 hover:text-white transition">Facebook</a></li>
              <li><a href="https://twitter.com" className="text-gray-400 hover:text-white transition">Twitter</a></li>
              <li><a href="https://instagram.com" className="text-gray-400 hover:text-white transition">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {currentYear} SESAVENTY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
