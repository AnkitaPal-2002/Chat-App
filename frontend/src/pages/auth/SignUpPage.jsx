import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Mail, User, KeyRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../store/useAuthStore';

// Validation schema
const formSchema = z.object({
  name: z.string().min(2, "Full name is required").max(50, "Full name must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const SignUpPage = () => {
  const {signup, isSigningUp} = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange'
  });

  const onSubmit = (data) => {
    console.log("Submitted:", data);
    signup(data);
    //toast.success("Sign Up Successful!");
    // backend logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="flex w-full max-w-6xl shadow-2xl rounded-2xl overflow-hidden bg-white">

        {/* Left Side - Sign Up Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h1 className="text-3xl font-bold text-center text-[#4B0082] mb-6">Sign Up to AuraChat</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Full Name */}
            <div>
              <label htmlFor="fullname" className="block text-sm font-medium text-[#4B0082] mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 text-[#A78BFA]" size={18} />
                <input
                  id="name"
                  type="text"
                  {...register('name')}
                  placeholder="John Doe"
                  className={`w-full pl-10 border rounded-lg px-3 py-2 focus:outline-none transition focus:ring-2 text-[#4B0082] bg-white ${errors.name ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-[#D8B4FE]'}`}
                />
              </div>
              {errors.fullname && (
                <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#4B0082] mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 text-[#A78BFA]" size={18} />
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="you@example.com"
                  className={`w-full pl-10 border rounded-lg px-3 py-2 focus:outline-none transition focus:ring-2 text-[#4B0082] bg-white ${errors.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-[#D8B4FE]'}`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#4B0082] mb-1">Password</label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 text-[#A78BFA]" size={18} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 border rounded-lg px-3 py-2 focus:outline-none transition focus:ring-2 text-[#4B0082] bg-white ${errors.password ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-[#D8B4FE]'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-[#A78BFA] hover:text-[#4B0082]"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!isValid}
              className={`w-full ${isValid ? 'bg-[#A78BFA] hover:bg-[#8B5CF6] cursor-pointer' : 'bg-[#E9D8FD] cursor-not-allowed'} text-white font-semibold py-2.5 rounded-lg transition-all shadow-md`}
            >
              Sign Up
            </button>

            {/* Already have an account? */}
            <p className="text-sm text-center text-[#4B0082]">
              Already have an account?
              <Link to="/login" className="text-[#8B5CF6] hover:underline font-medium ml-1">
                Log In
              </Link>
            </p>
          </form>
        </div>

        {/* Right Side - Auth Image */}
        <div className="hidden md:flex w-1/2 bg-[#F3E8FF] flex-col items-center justify-center p-8 text-center">
          <img
            src="/authenticationImage.jpg" // Replace this with your actual image path or URL
            alt="Authentication Illustration"
            className="max-w-full h-auto object-contain"
          />
          <h2 className="text-2xl font-semibold text-[#4B0082] mb-2">Welcome to ChatApp</h2>
          <p className="text-[#6B21A8] text-sm max-w-xs">
            Join the conversation and stay connected with your friends. Sign up today and start chatting in real time!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
