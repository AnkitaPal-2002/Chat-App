import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

// Validation schema
const formSchema = z.object({
  fullname: z.string().min(2, "Full name is required").max(50, "Full name must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data) => {
    console.log("Submitted:", data);
    // backend logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-[#4B0082] mb-6">Sign Up to ChatApp</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Full Name */}
          <div>
            <label htmlFor="fullname" className="block text-sm font-medium text-[#4B0082] mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 text-[#A78BFA]" size={18} />
              <input
                id="fullname"
                type="text"
                {...register('fullname')}
                placeholder="John Doe"
                className={`w-full pl-10 border rounded-lg px-3 py-2 focus:outline-none transition focus:ring-2 text-[#4B0082] bg-white ${
                  errors.fullname ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-[#D8B4FE]'
                }`}
              />
            </div>
            {errors.fullname && (
              <p className="text-sm text-red-600 mt-1">{errors.fullname.message}</p>
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
                className={`w-full pl-10 border rounded-lg px-3 py-2 focus:outline-none transition focus:ring-2 text-[#4B0082] bg-white ${
                  errors.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-[#D8B4FE]'
                }`}
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
              <Lock className="absolute left-3 top-2.5 text-[#A78BFA]" size={18} />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder="••••••••"
                className={`w-full pl-10 pr-10 border rounded-lg px-3 py-2 focus:outline-none transition focus:ring-2 text-[#4B0082] bg-white ${
                  errors.password ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-[#D8B4FE]'
                }`}
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
            className="w-full bg-[#A78BFA] hover:bg-[#8B5CF6] text-white font-semibold py-2.5 rounded-lg transition-all shadow-md"
          >
            Sign Up
          </button>

          {/* Already have an account? */}
          <p className="text-sm text-center text-[#4B0082]">
            Already have an account?{" "}
            <Link to="/login" className="text-[#8B5CF6] hover:underline font-medium ml-1">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
