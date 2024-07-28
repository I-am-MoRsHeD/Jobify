import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import { useEffect, useState } from "react";


const CompanyLists = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [length, setLength] = useState(0);
    const itemsPerPage = 5;
    const role = 'admin';
    const axiosPrivate = useAxiosPrivate();

    const { data: companies, isPending, refetch } = useQuery({
        queryKey: ['companies', currentPage, itemsPerPage, role],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/companies/1/pag?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&role=${role}`)
            return res.data;
        }
    })

    if (isPending) {
        <div>Loading...........</div>
    }

    useEffect(() => {
        if (companies && companies?.totalCount) {
            setLength(companies?.totalCount);
            refetch();
        } else {
            setLength(0);
            refetch();
        }
    }, [companies, refetch]);

    return (
        <div>
            <SectionTitle title={"Companies List"} />
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead >
                        <tr className="border-b-2 border-black">
                            <th>SI</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>About</th>
                            <th>CreatedAt</th>
                            <th>CreatedBy</th>
                            <th>TotalBranch</th>
                            <th>Members</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody >
                        {/* row 1 */}
                        {companies?.items?.length === 0 ? <div>There is no company available here</div> : (
                            companies?.items?.map((data, index) =>
                                <tr className="border-b-[1px] border-black" key={data?.totalBranch}>
                                    <td>{index + 1}</td>
                                    <td>
                                        {data?.companyName?.length > 12 ? data?.companyName?.slice(0, 11) + "...." : data?.companyName}
                                    </td>
                                    <td>
                                        {data?.address?.length > 12 ? data?.address?.slice(0, 11) + "...." : data?.address}
                                    </td>
                                    <td>
                                        {data?.about?.length > 12 ? data?.about?.slice(0, 11) + "...." : data?.about}
                                    </td>
                                    <td>{new Date(data?.createdAt).toLocaleDateString()}</td>
                                    <td>{data?.email}</td>
                                    <td>{data?.totalBranch}</td>
                                    <td>{data?.members}</td>
                                    <th>
                                        <button className="focus:outline-none focus:ring-2 w-full focus:border-transparent bg-blue-600 hover:bg-blue-500 text-white font-semibol text-xs py-1 rounded-md">
                                            <Link to={`/company/${data?._id}`}>
                                                Details
                                            </Link>
                                        </button>
                                    </th>
                                </tr>)
                        )
                        }
                    </tbody>
                </table>
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(length / itemsPerPage)}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};

export default CompanyLists;