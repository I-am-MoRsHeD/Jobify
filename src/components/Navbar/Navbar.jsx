import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logged Out!",
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('user');
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Successfully logged out",
                    showConfirmButton: false,
                    timer: 1500,
                });
                // clearToken();
                navigate("/");
            }
        });

    }

    return (
        <div className=" bg-blue-600">
            <div className="flex flex-row justify-between py-2 3xl:w-[76%] 2xl:w-[74%] 2xl:mx-auto mx-3">
                <div className="w-44 md:w-[600px] lg:w-[700px]">
                    <h2 className="text-white font-bold text-lg">Technical Task Solution</h2>
                </div>
                <div className="">
                    <button
                        onClick={handleLogout}
                        className="lg:bg-white whitespace-nowrap mb-2 lg:mb-0 bg-yellow-950 lg:text-black text-white text-base lg:text-lg font-semibold px-5 py-1 rounded flex items-center justify-center gap-1"
                    >
                        {/* <IoPersonOutline className="text-xl" /> */}
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;