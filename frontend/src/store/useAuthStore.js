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
            const res = await axiosInstance.get('/auth/check');
            set ({
                authUser: res.data,
                isCheckingAuth: false
            });
        }catch(error){
            console.error("Error checking authentication:", error);
            set({isCheckingAuth: false});
        }
    }
}))