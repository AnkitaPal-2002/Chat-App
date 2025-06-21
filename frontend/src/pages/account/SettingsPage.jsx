import React from 'react';
import useThemeStore from '../../store/useThemeStore';

const SettingsPage = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-[#8B5CF6] dark:text-[#D8B4FE] mb-6">
          Settings
        </h2>

        {/* Theme Info */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg text-gray-700 dark:text-gray-300">Current Theme:</span>
          <span className="capitalize font-semibold text-[#8B5CF6] dark:text-[#D8B4FE]">
            {theme}
          </span>
        </div>

        {/* Theme Toggle Button */}
        <div className="flex items-center justify-between mt-6">
          <span className="text-lg text-gray-700 dark:text-gray-300">Toggle Theme</span>
          <button
            onClick={toggleTheme}
            className="w-14 h-8 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 relative transition-colors duration-300"
            aria-label="Toggle Theme"
          >
            <span className="absolute left-1 text-yellow-400 text-lg">☀️</span>
            <span className="absolute right-1 text-white text-lg">🌙</span>
            <span
              className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
              }`}
            ></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
