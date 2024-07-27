
import useAxiosPrivate from './useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';

const useSingleUser = (email) => {
    const axiosPrivate = useAxiosPrivate();

    const { data: singleUser, refetch } = useQuery({
        queryKey: ['SignleUser', email],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/users/1/${email}`)
            return res.data;
        }
    })

    return [singleUser, refetch];
};


export default useSingleUser;