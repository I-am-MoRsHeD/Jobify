import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAllCompany from "../../hooks/useAllCompany";
import Swal from "sweetalert2";
import JobUpdateModal from "../../components/JobUpdateModal/JobUpdateModal";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";


const CompanyInfo = () => {
    const axiosPrivate = useAxiosPrivate();
    const { id } = useParams();
    const [companies] = useAllCompany();
    const [findCompany, setFindCompany] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [jobDetails, setJobDetails] = useState();
    // const [companyName, setCompanyName] = useState('');

    useEffect(() => {
        const findCompany = companies?.filter(company => company?._id === id);
        setFindCompany(findCompany);
    }, [companies, id])


    const { data: JobsByCompany, refetch, isPending } = useQuery({
        queryKey: ['JobsByCompany', id],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/jobs/2?companyName=${findCompany[0]?.companyName}`)
            return res.data;
        }
    })

    useEffect(() => {
        // setCompanyName(findCompany[0]?.companyName)
        refetch();
    }, [findCompany, refetch]);

    if (isPending) {
        return <div>Loading company jobs......</div>
    }

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
            <div className="overflow-auto 4xl:h-[80vh] 2xl:h-[80vh] xl:h-[90vh] lg:h-[83vh] bg-white">
                {/* about company */}
                <div className="flex flex-col">
                    <div className="w-full">
                        <img className="w-full h-96" src="../../../public/images/companyImage.jpg" alt="" />
                    </div>
                    {
                        findCompany?.map(data => (
                            <div key={data?._id} className="py-5 space-y-2">
                                <h1 className="text-5xl font-bold">{data?.companyName}</h1>
                                <h3 className="text-xl font-semibold">{data?.address}</h3>
                                <p>{data?.about}!</p>
                            </div>
                        ))
                    }
                </div>
                {/* about companyJobs */}
                <div className="py-1 border-b-2 border-black w-[60%] mx-auto">
                    <h1 className="text-3xl font-bold text-center">{findCompany[0]?.companyName} Job List</h1>
                </div>
                <div className="overflow-x-auto py-5">
                    {
                        JobsByCompany?.length === 0 ? <div className=" flex flex-row justify-center items-center"> <h1 className="text-3xl font-bold"> There is no jobs for this company </h1></div> : (
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
                                        JobsByCompany.map((data, index) =>
                                            <tr className="border-b-[1px] border-black" key={data?.totalBranch}>
                                                <th>{index + 1}</th>
                                                <td>{data?.jobId} </td>
                                                <td>{data?.title} </td>
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
                                                    <button onClick={() => handleUpdateModal(data?._id)} className="btn btn-ghost btn-xs"><FiEdit className="text-lg" /></button>
                                                    <button onClick={() => handleDelete(data?._id)} className="btn  btn-xs"><RiDeleteBin6Line className="text-lg" /></button>
                                                </th>
                                            </tr>)
                                    }
                                </tbody>
                            </table>
                        )
                    }
                </div>
            </div>
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

export default CompanyInfo;