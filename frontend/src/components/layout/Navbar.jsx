import React from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { Settings, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <nav className="w-full flex items-center justify-between bg-white px-6 py-3 shadow-md">
      {/* Left Side: App Name Always */}
      <div className="text-[#4B0082] font-bold text-xl">AuraChat</div>

      {/* Right Side: Conditional Buttons */}
      <div className="flex items-center space-x-4 text-[#4B0082]">
        {/* Settings - always visible */}
            <Link to="/settings">
        <button className="flex items-center gap-1 hover:text-[#8B5CF6] transition">
          <Settings size={18} />
          <span className="text-sm">
            Settings
            </span>
        </button>
            </Link>

        {/* Shown only if authenticated */}
        {authUser && (
          <>
                <Link to="/profile">
            <button className="flex items-center gap-1 hover:text-[#8B5CF6] transition">
              <User size={18} />
              <span className="text-sm">
                Profile
                </span>
            </button>
                </Link>
            <button
              onClick={logout}
              className="flex items-center gap-1 hover:text-[#8B5CF6] transition"
            >
              <LogOut size={18} />
              <span className="text-sm">Logout</span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
