import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";
import { useSelector } from "react-redux";


const useAdmin = () => {
    const axiosPrivate = useAxiosPrivate();
    // const user = localStorage.getItem('user');
    const { user } = useSelector((state) => state.userSlice);

    const { data: isAdmin, isPending: isAdminLoading, error: isAdminError, } = useQuery({
        queryKey: [user?.email, "isAdmin"],
        queryFn: async () => {
            if (!user?.email) return;
            try {
                const res = await axiosPrivate.get(`/users/1/admin/${user?.email}`);
                return res?.data?.isAdmin;
            } catch (error) {
                if (error.isAxiosError) {
                    console.error("Network error:", error);
                } else {
                    console.error("Unexpected error:", error);
                }
                throw error;
            }
        },
    });
    console.log(isAdmin, user?.email)
    return [isAdmin, isAdminLoading, isAdminError];
};

export default useAdmin;