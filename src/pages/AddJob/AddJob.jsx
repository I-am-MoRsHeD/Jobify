import { useForm } from "react-hook-form";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAllCompany from "../../hooks/useAllCompany";

const AddJob = () => {
    const axiosPrivate = useAxiosPrivate();
    const [companies, isPending, refetch] = useAllCompany();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    // const { data: companies, isPending, refetch } = useQuery({
    //     queryKey: ['companies'],
    //     queryFn: async () => {
    //         const res = await axiosPrivate.get(`/companies`)
    //         return res.data;
    //     }
    // });


    const onSubmit = (data) => {
        const jobDetails = {
            title: data?.title,
            jobId: data?.jobId,
            salary: data?.salary,
            description: data?.description,
            companyName: data?.companyName,
            location: data?.location,
            email: "akkas@gmail.com",
        };
        console.log(jobDetails);
        // dispatch(addCompany(jobDetails))
        // job added to the server
        axiosPrivate.post("/jobs", jobDetails).then((res) => {
            console.log(res);
            if (res.data.message === "success") {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Job added successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                reset();
            }
        });
    };


    return (
        <div className="4xl:h-[80vh] 2xl:h-[80vh] xl:h-[90vh] lg:h-[83vh] mx-3 lg:mx-0 rounded-lg bg-white overflow-hidden">
            <div className="p-2 rounded-md 2xl:h-[66vh] h-full flex items-center justify-center">
                <div className="md:w-5/6 mx-auto w-full md:p-5 ">
                    <div className="">
                        <SectionTitle title={"Add Job"} />
                    </div>
                    <form className="" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 md:gap-4 mb-2">
                            {/* Job Title */}
                            <div className="form-control w-full my-1">
                                <input
                                    {...register("title", { required: true })}
                                    type="text"
                                    placeholder="Job Title"
                                    className="input input-bordered w-full focus:outline-none bg-[#F0F2F5]"
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
                                >
                                    {companies?.map((company, index) => (
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
                                />
                                {errors.email && (
                                    <span className="text-red-500">
                                        Email is required
                                    </span>
                                )}
                            </div>
                        </div>
                        <button className="focus:outline-none focus:ring-2 w-full mt-5 focus:border-transparent bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-md">
                            Add Job
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddJob;