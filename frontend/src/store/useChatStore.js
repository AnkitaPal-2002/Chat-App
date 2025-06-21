import {create} from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/api/axios';

export const useChatStore = create((set) => ({
    meassages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const response = await axiosInstance.get('/users');
            set({ users: response.data, isUsersLoading: false });
        } catch (error) {
            set({ isUsersLoading: false });
            toast.error('Failed to load users');
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const response = await axiosInstance.get(`/messages/${userId}`);
            set({ meassages: response.data, isMessagesLoading: false });
        } catch (error) {
            set({ isMessagesLoading: false });
            toast.error('Failed to load messages');
        }
    },

}));