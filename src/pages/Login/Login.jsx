import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";


const Login = () => {
    const axiosPrivate = useAxiosPrivate();
    // const dispatch = useDispatch();
    const { user } = useSelector((state) => state.userSlice);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value.toLowerCase();
        const password = parseInt(form.password.value);
        const role = 'admin';
        const userInfo = {
            email,
            password,
            role
        };

        localStorage.setItem('user', email);
        const res = await axiosPrivate.post('/users', userInfo);
        if (res) {
            console.log(res);
            navigate('/');
        }
    };

    return (
        <div className="font-Montserrat w-full">
            <div className="bg-[#ebedfe] w-full text-center 4xl:py-12 py-5 text-[#565fa8] flex justify-center items-center">
                <h1 className="text-[46px] font-bold mt-0">Log In</h1>
            </div>
            <div className="flex md:bg-white bg-[#F3F3F3] items-center justify-center h-full 4xl:py-20 py-10 rounded-lg">
                <div className=" flex flex-col w-full md:w-1/3 ">
                    <div className="bg-[#ebedfe] rounded-lg  py-[10%] px-[5%] md:px-[5%]">
                        <form onSubmit={handleLogin} className="">
                            <div className="form-control mb-4 flex justify-center">
                                <div className="absolute pl-2"></div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="w-full bg-[#ebedfe] border-1.5 border-[#6f98b9] placeholder-[#444444] py-4 rounded-lg border outline-none pl-8 pr-2"
                                    required
                                />
                            </div>
                            <div className="form-control  relative flex justify-center">
                                <div className="absolute pl-2"></div>
                                <input
                                    // type={showPassword ? "text" : "password"}
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="w-full border-1.5 border-[#6f98b9] bg-[#ebedfe] placeholder-[#444444] py-4 rounded-lg border outline-none pl-8 pr-2 "
                                    required
                                />
                                {/* <span
                                    className="absolute right-0 cursor-pointer mr-5"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <FaEye className="text-xl" />
                                    ) : (
                                        <FaEyeSlash className="text-xl" />
                                    )}
                                </span> */}
                            </div>
                            {/* <div>{error ? <p className="text-red-600">{error}</p> : ""}</div> */}
                            <div className="flex items-center mt-5">
                                <input
                                    type="checkbox"
                                    name="checkbox"
                                    id="checkbox"
                                    className="cursor-pointer bg-[#565fa8] mr-3"
                                />
                                <label
                                    htmlFor="checkbox"
                                    className="font-normal text-lg text-[#444444] ml-1 cursor-pointer"
                                >
                                    Remember Me
                                </label>
                            </div>
                            <div className="form-control mt-8">
                                <button className="text-xl rounded-md font-semibold  py-4 bg-[#565fa8] text-white hover:bg-[#565fa8] w-full">
                                    Log In
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;