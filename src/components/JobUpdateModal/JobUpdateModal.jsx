import { useForm } from "react-hook-form";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { GiCancel } from "react-icons/gi";
import Swal from "sweetalert2";
import useAllCompany from "../../hooks/useAllCompany";


const JobUpdateModal = ({ onClose, refetch, jobDetails }) => {
    const axiosPrivate = useAxiosPrivate();
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [companies] = useAllCompany();

    const onSubmit = async (data) => {
        try {
            const updatedJobDetails = {
                title: data?.title,
                jobId: data?.jobId,
                salary: data?.salary,
                description: data?.description,
                companyName: data?.companyName,
                location: data?.location,
                email: data?.email,
            };
            const res = await axiosPrivate.patch(`/jobs/${jobDetails[0]?._id}`, updatedJobDetails);
            console.log(res);
            if (res.data.message === "success") {
                refetch();
                Swal.fire({
                    title: "Job is Updated!",
                    text: "Your request has been accepted.",
                    icon: "success",
                });
                onClose();
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Something Wrong",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.error("Error updating jobs:", error);
        }
    };

    return (
        <div className="fixed z-[100] overflow-scroll  flex items-center justify-center inset-0 bg-black/10 duration-100 ">
            <div className="lg:w-[50%] w-[95%] rounded-xl bg-white px-4 lg:py-3 py-1 scale-1 opacity-1 duration-200 lg:mt-0 mt-40">
                <div className="rounded-lg w-full">
                    <button
                        onClick={onClose}
                        className="text-[#1D2A3B] float-end text-lg"
                    >
                        <GiCancel className="text-2xl" />
                    </button>
                    <div className="w-[90%] mx-auto pt-5 pb-10">
                        <h1 className="text-2xl font-semibold py-5">
                            Edit Job Details
                        </h1>
                        {/* mapping the data */}
                        {jobDetails?.map((job) => (
                            <form key={job?._id} onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid lg:grid-cols-2 grid-cols-1 gap-1 md:gap-4 mb-2 lg:text-base text-sm">
                                    {/* Job Title */}
                                    <div className="form-control w-full my-1">
                                        <input
                                            {...register("title", { required: true })}
                                            type="text"
                                            placeholder="Job Title"
                                            className="input input-bordered w-full focus:outline-none bg-[#F0F2F5]"
                                            defaultValue={job?.title}
                                        />
                                        {errors.title && (
                                            <span className="text-red-500">Job Title is required</span>
                                        )}
                                    </div>
                                    {/* Job Id */}
                                    <div className="form-control w-full my-1">
                                        <input
                                            {...register("jobId", { required: true })}
                                            type="number"
                                            placeholder="Job Id"
                                            className="input input-bordered focus:outline-none w-full bg-[#F0F2F5]"
                                            defaultValue={job?.jobId}
                                        />
                                        {errors.jobId && (
                                            <span className="text-red-500">Job Id is required</span>
                                        )}
                                    </div>
                                </div>
                                {/* Description */}
                                <div className="form-control w-full my-3">
                                    <textarea
                                        {...register("description", { required: true })}
                                        type="text"
                                        placeholder="Description"
                                        className="input input-bordered w-full focus:outline-none py-2 bg-[#F0F2F5]"
                                        defaultValue={job?.description}
                                    />
                                    {errors.description && (
                                        <span className="text-red-500">Description is required</span>
                                    )}
                                </div>
                                <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 md:gap-4 mb-2">
                                    {/* Salary */}
                                    <div className="form-control w-full my-1">
                                        <input
                                            {...register("salary", { required: true })}
                                            type="number"
                                            placeholder="Put Salary"
                                            className="input input-bordered w-full focus:outline-none bg-[#F0F2F5]"
                                            defaultValue={job?.salary}
                                        />
                                        {errors.salary && (
                                            <span className="text-red-500">Salary is required</span>
                                        )}
                                    </div>
                                    {/* Company Name */}
                                    <div className="form-control w-full my-1">
                                        <select
                                            className="select select-bordered w-full focus:outline-none bg-[#F0F2F5]"
                                            {...register("companyName", { required: true })}
                                            defaultValue={job?.companyName}
                                        >
                                            {companies?.map((company) => (
                                                <option value={company?.companyName} key={company._id}>
                                                    {company?.companyName}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.companyName && (
                                            <span className="text-red-500">Company Name is required</span>
                                        )}
                                    </div>
                                </div>
                                <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 md:gap-4 mb-2">
                                    {/* Location */}
                                    <div className="form-control w-full my-1">
                                        <input
                                            {...register("location", { required: true })}
                                            type="text"
                                            placeholder="Put Location"
                                            className="input input-bordered w-full focus:outline-none bg-[#F0F2F5]"
                                            defaultValue={job?.location}
                                        />
                                        {errors.location && (
                                            <span className="text-red-500">Location is required</span>
                                        )}
                                    </div>
                                    {/* email */}
                                    <div className="form-control w-full my-1">
                                        <input
                                            {...register("email", { required: true })}
                                            type="email"
                                            placeholder="Email"
                                            className="input input-bordered focus:outline-none w-full bg-[#F0F2F5]"
                                            defaultValue={job?.email}
                                        />
                                        {errors.email && (
                                            <span className="text-red-500">
                                                Email is required
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <button className="focus:outline-none focus:ring-2 w-full mt-5 focus:border-transparent bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-md">
                                    Update Job
                                </button>
                            </form>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobUpdateModal;