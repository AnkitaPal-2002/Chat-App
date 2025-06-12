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
      console.log("Selected image:", file);
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = async () => {
        const base64Image = reader.result;
        console.log("Base64 Image:", base64Image);
        await updateProfile({ profilePic: base64Image });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5FF] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-[#4B0082] mb-6">Your Profile</h2>

        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Profile Image with Camera Icon */}
          <div className="relative w-32 h-32">
            {isUpdatingProfile ? (
              <div className="w-full h-full flex items-center justify-center rounded-full bg-[#F3E8FF] text-[#8B5CF6] font-medium text-sm border-4 border-[#D8B4FE] shadow">
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
              className="absolute bottom-1 right-1 bg-[#A78BFA] text-white p-1.5 rounded-full hover:bg-[#8B5CF6] shadow transition"
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
          <div className="flex-1 space-y-4 text-[#4B0082]">
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
              <span className="text-green-600 font-semibold">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
