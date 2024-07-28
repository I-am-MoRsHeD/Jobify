import { useForm } from "react-hook-form";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Swal from "sweetalert2";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { useDispatch } from "react-redux";
import { addCompany } from "../../redux/features/companySlice";


const AddCompany = () => {
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors },reset } = useForm();

    const onSubmit = (data) => {
        const companyDetails = {
            companyName: data?.companyName,
            totalBranch: data?.branch,
            address: data?.address,
            email: "akkas@gmail.com",
            members: data?.members,
            about: data?.about,
        };
        console.log(companyDetails);
        dispatch(addCompany(companyDetails))
        // company added to the server
        axiosPrivate.post("/companies", companyDetails).then((res) => {
            console.log(res);
            if (res.data.message === "success") {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Company added successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                reset();
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Company Name has already been taken",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    };

    return (
        <div className="4xl:h-[80vh] 2xl:h-[80vh] xl:h-[90vh] lg:h-[83vh] mx-3 lg:mx-0 rounded-lg bg-white overflow-hidden">
            <div className="p-2 rounded-md 2xl:h-[66vh] h-full flex items-center justify-center">
                <div className="md:w-5/6 mx-auto w-full md:p-5 ">
                    <div className="">
                        <SectionTitle title={"Add Company"} />
                    </div>
                    <form className="" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 md:gap-4 mb-2">
                            {/* Company Name */}
                            <div className="form-control w-full my-1">
                                <input
                                    {...register("companyName", { required: true })}
                                    type="text"
                                    placeholder="Company Name"
                                    className="input input-bordered w-full focus:outline-none bg-[#F0F2F5]"
                                />
                                {errors.companyName && (
                                    <span className="text-red-500">Company Name is required</span>
                                )}
                            </div>
                            {/* total branch */}
                            <div className="form-control w-full my-1">
                                <input
                                    {...register("branch", { required: true })}
                                    type="number"
                                    placeholder="Total branch"
                                    className="input input-bordered focus:outline-none w-full bg-[#F0F2F5]"
                                />
                                {errors.branch && (
                                    <span className="text-red-500">Total branch is required</span>
                                )}
                            </div>
                        </div>
                        {/* Address */}
                        <div className="form-control w-full my-3">
                            <input
                                {...register("address", { required: true })}
                                type="text"
                                placeholder="Put Address"
                                className="input input-bordered w-full focus:outline-none bg-[#F0F2F5]"
                            />
                            {errors.address && (
                                <span className="text-red-500">Company Address is required</span>
                            )}
                        </div>
                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 md:gap-4 mb-2">
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
                            {/* Members */}
                            <div className="form-control w-full my-1">
                                <input
                                    {...register("members", { required: true })}
                                    type="number"
                                    placeholder="Total Members"
                                    className="input input-bordered focus:outline-none w-full bg-[#F0F2F5]"
                                />
                                {errors.members && (
                                    <span className="text-red-500">Total Members is required</span>
                                )}
                            </div>
                        </div>
                       {/* About company */}
                       <div className="form-control w-full my-3">
                            <textarea
                                {...register("about", { required: true })}
                                type=""
                                placeholder="About Company"
                                className="input input-bordered w-full focus:outline-none py-2 bg-[#F0F2F5]"
                            />
                            {errors.about && (
                                <span className="text-red-500">About Company is required</span>
                            )}
                        </div>
                        <button className="focus:outline-none focus:ring-2 w-full mt-5 focus:border-transparent bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-md">
                            Add Company
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCompany;