/**
 * Footer Component - Website footer with copyright and links
 */
const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-gray-500">© {new Date().getFullYear()} Infinity Green Energy Pvt Ltd. All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-gray-500">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-gray-500">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
