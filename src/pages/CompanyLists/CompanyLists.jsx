import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";


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

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPrivate.delete(`/companies/${id}`).then((res) => {
                    console.log(res.data);
                    if (res.data.deletedCount === 1) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Company is deleted successfully",
                            icon: "success",
                        });
                        refetch();
                    }
                });
            }
        });
    };

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
                                    <th className="flex justify-between gap-4">
                                        <button className="focus:outline-none focus:ring-2 w-full focus:border-transparent bg-blue-600 hover:bg-blue-500 text-white font-semibol text-xs py-1 rounded-md">
                                            <Link to={`/company/${data?._id}`}>
                                                Details
                                            </Link>
                                        </button>
                                        <button title="Delete Job" onClick={() => handleDelete(data?._id)} className="btn  btn-xs"><RiDeleteBin6Line className="text-lg" /></button>
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