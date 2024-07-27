import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import JobUpdateModal from "../../components/JobUpdateModal/JobUpdateModal";
import Pagination from "../../components/Pagination/Pagination";


const JobLists = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [length, setLength] = useState(0);
    const itemsPerPage = 5;
    const role = 'admin';
    const axiosPrivate = useAxiosPrivate();
    const [openModal, setOpenModal] = useState(false);
    const [jobDetails, setJobDetails] = useState("");

    const { data: jobs, isPending, refetch } = useQuery({
        queryKey: ['jobs', currentPage, itemsPerPage, role],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/jobs/1/pag?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&role=${role}`)

            return res.data;
        }
    });

    if (isPending) {
        <div>Loading...........</div>
    }

    useEffect(() => {
        if (jobs && jobs?.totalCount) {
          setLength(jobs?.totalCount);
          refetch();
        } else {
          setLength(0);
          refetch();
        }
      }, [jobs, refetch]);

    const handleUpdateModal = async (id) => {
        try {
            const res = await axiosPrivate.get(`/jobs/${id}`)
            setJobDetails(res.data);
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    };

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
                axiosPrivate.delete(`/jobs/${id}`).then((res) => {
                    console.log(res.data);
                    if (res.data.deletedCount === 1) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Job is deleted successfully",
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
            <SectionTitle title={"Jobs List"} />
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead >
                        <tr className="border-b-2 border-black">
                            <th>SI</th>
                            <th>JobId</th>
                            <th>Title</th>
                            <th>Company</th>
                            <th>Salary</th>
                            <th>Description</th>
                            <th>Location</th>
                            <th>Email</th>
                            <th>CreatedAt</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody >
                        {/* row 1 */}
                        {
                            jobs?.items?.length === 0 ? <div>There is no jobs available here</div> :
                                (
                                    jobs?.items?.map((data, index) =>
                                        <tr className="border-b-[1px] border-black" key={data?._id}>
                                            <td>{index + 1}</td>
                                            <td>{data?.jobId} </td>
                                            <td>{data?.title?.length > 12 ? data?.title?.slice(0, 11) + "...." : data?.title} </td>
                                            <td>
                                                {data?.companyName.length > 10 ? data?.companyName?.slice(0, 9) + "...." : data?.companyName}
                                            </td>
                                            <td>{data?.salary}</td>
                                            <td>
                                                {data?.description?.length > 12 ? data?.description?.slice(0, 11) + "...." : data?.description}
                                            </td>
                                            <td>{data?.location?.length > 12 ? data?.location?.slice(0, 11) + "...." : data?.location}</td>
                                            <td>{data?.email}</td>
                                            <td>{new Date(data?.createdAt).toLocaleDateString()}</td>
                                            <th className="flex justify-between gap-4">
                                                <button title="Update Job" onClick={() => handleUpdateModal(data?._id)} className="btn btn-ghost btn-xs"><FiEdit className="text-lg" /></button>
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
            {openModal && (
                <JobUpdateModal
                    onClose={handleCloseModal}
                    refetch={refetch}
                    jobDetails={jobDetails}
                />
            )}
        </div>
    );
};

export default JobLists;