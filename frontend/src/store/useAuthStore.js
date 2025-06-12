import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/api/axios';
import {create} from 'zustand';

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async() =>{
        try{
            const res = await axiosInstance.get('user/auth/check-auth');
            set ({
                authUser: res.data,
                isCheckingAuth: false
            });
        }catch(error){
            console.error("Error checking authentication:", error);
            set({isCheckingAuth: false});
        }
    },

    signup: async(data) =>{
        set({isSigningUp: true});
        try {
            console.log("Signing up with data:", data);
            
            const res = await axiosInstance.post('user/auth/register', data);
            set({
                authUser: res.data
            });
            toast.success("Account created successfully!");
        } catch (error) {
            console.error("Error signing up:", error);
            toast.error(error.response?.data?.message || "Failed to create account");
        }finally{
            set({isSigningUp: false});
        }
    },

    login: async(data) =>{
        set({isLoggingIn: true});
        try {
            console.log("Logging in with data:", data);
            const res = await axiosInstance.post('user/auth/login', data);
            set({
                authUser: res.data
            });
            toast.success("Logged in successfully!");
        } catch (error) {
            console.error("Error logging in:", error);
            toast.error(error.response?.data?.message || "Failed to log in");
        } finally {
            set({isLoggingIn: false});
        }
    },

    logout: async() =>{
        try {
            const res = await axiosInstance.post('user/auth/logout');
            set({authUser: null});
            toast.success(res.data.message || "Logged out successfully");
        } catch (error) {
            console.error("Error logging out:", error);
            toast.error("Failed to log out");
        }
    },

    updateProfile: async(data) =>{
        set({isUpdatingProfile: true});
        try {
            console.log("Updating profile with data:", data);
            const res = await axiosInstance.put('user/auth/update-profile', data);
            set({
                authUser: res.data
            });
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            set({isUpdatingProfile: false});
        }
    }
}))