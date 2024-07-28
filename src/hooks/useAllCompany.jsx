import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './useAxiosPrivate';

const useAllCompany = () => {
    const axiosPrivate = useAxiosPrivate();

    const { data: companies, isPending, refetch } = useQuery({
        queryKey: ['companies'],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/companies`)
            return res.data;
        }
    });
    return [companies, isPending, refetch];
};

export default useAllCompany;