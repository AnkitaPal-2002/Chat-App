import React, { useRef } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { User, Mail, CalendarCheck, ShieldCheck, Camera } from 'lucide-react';

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const fileInputRef = useRef(null);

  const { name, email, createdAt, profilePic } = authUser.user || {};
  const defaultImage = '/default-image.jpg';
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString('en-GB').replaceAll('/', '-')
    : 'N/A';

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async () => {
        const base64Image = reader.result;
        await updateProfile({ profilePic: base64Image });
      };
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5FF] dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 w-full max-w-xl rounded-2xl shadow-xl p-8 transition-colors duration-300">
        <h2 className="text-3xl font-bold text-center text-[#4B0082] dark:text-[#D8B4FE] mb-6">
          Your Profile
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Profile Image */}
          <div className="relative w-32 h-32">
            {isUpdatingProfile ? (
              <div className="w-full h-full flex items-center justify-center rounded-full bg-[#F3E8FF] dark:bg-gray-700 text-[#8B5CF6] font-medium text-sm border-4 border-[#D8B4FE] shadow">
                Uploading...
              </div>
            ) : (
              <img
                src={profilePic || defaultImage}
                alt="Profile"
                className="w-full h-full rounded-full border-4 border-[#D8B4FE] object-cover shadow"
              />
            )}
            <button
              onClick={handleImageClick}
              className="absolute bottom-1 right-1 bg-[#A78BFA] hover:bg-[#8B5CF6] text-white p-1.5 rounded-full shadow transition"
              title="Update profile picture"
            >
              <Camera size={16} />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1 space-y-4 text-[#4B0082] dark:text-[#E0D6FD]">
            <div className="flex items-center gap-2">
              <User className="text-[#A78BFA]" />
              <span className="font-medium">Full Name:</span>
              <span>{name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="text-[#A78BFA]" />
              <span className="font-medium">Email:</span>
              <span>{email}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarCheck className="text-[#A78BFA]" />
              <span className="font-medium">Member Since:</span>
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-[#A78BFA]" />
              <span className="font-medium">Account Status:</span>
              <span className="text-green-600 dark:text-green-400 font-semibold">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
