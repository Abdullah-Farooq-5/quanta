import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Quanta</h3>
            <p className="text-sm text-gray-300">
              A platform dedicated to making quantum computing accessible to students in Pakistan and beyond.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">GitHub</a></li>
              <li><a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">LinkedIn</a></li>
              <li><a href="mailto:your.email@example.com" className="hover:text-blue-300">Email</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Quanta. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;