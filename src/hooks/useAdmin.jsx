import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";


const useAdmin = () => {
    const axiosPrivate = useAxiosPrivate();
    const user = localStorage.getItem('user');

    const { data: isAdmin, isPending: isAdminLoading, error: isAdminError, } = useQuery({
        queryKey: [user, "isAdmin"],
        queryFn: async () => {
            if (!user) return;
            try {
                const res = await axiosPrivate.get(`/users/1/admin/${user}`);
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
    console.log(isAdmin, user)
    return [isAdmin, isAdminLoading, isAdminError];
};

export default useAdmin;