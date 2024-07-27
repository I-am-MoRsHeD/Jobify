import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import { MdAddTask, MdDashboard, MdOutlineAddCircleOutline } from "react-icons/md";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";


// eslint-disable-next-line react/prop-types
const AdminDashboard = ({ isSideMenuOpen, toggleSideMenu, closeSideMenu }) => {
    // const navigate = useNavigate();

    // const handleLogout = () => {
    //     Swal.fire({
    //         title: "Are you sure?",
    //         text: "You won't be able to revert this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes, Logged Out!",
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             logOut().then(() => {
    //                 Swal.fire({
    //                     position: "top-end",
    //                     icon: "success",
    //                     title: "Successfully logged out",
    //                     showConfirmButton: false,
    //                     timer: 1500,
    //                 });
    //                 navigate("/login");
    //             });
    //         }
    //     });
    // };

    const navlinks = (
        <>
        {/* add new company */}
            <li className="relative px-2 py-0">
                <NavLink
                    defaultChecked
                    className={({ isActive }) =>
                        isActive
                            ? "inline-flex items-center bg-blue-700 w-full pl-2 pr-2 py-2 font-bold rounded-lg border border-blue-500 text-white text-base"
                            : "inline-flex items-center font-semibold pl-1.5 w-full hover:text-blue-600 text-base  border-x-2 border-blue-600 rounded-md py-1.5"
                    }
                    to="addCompany"
                >
                    <MdDashboard />
                    <span className="ml-2.5">Add Company</span>
                </NavLink>
            </li>
            {/* company list */}
            <li className="relative px-2 py-0">
                <NavLink
                    defaultChecked
                    className={({ isActive }) =>
                        isActive
                            ? "inline-flex items-center bg-blue-700 w-full pl-2 pr-2 py-2 font-bold rounded-lg border border-blue-500 text-white text-base"
                            : "inline-flex items-center font-semibold pl-1.5 w-full hover:text-blue-600 text-base border-x-2 border-blue-600 rounded-md py-1.5"
                    }
                    to="companyLists"
                >
                    <MdOutlineAddCircleOutline />
                    <span className="ml-2.5">Company Lists</span>
                </NavLink>
            </li>
            {/* add jobs */}
            <li className="relative px-2 py-0 ">
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? "inline-flex items-center bg-blue-700 w-full pl-2 pr-2 py-2 font-bold rounded-lg border border-blue-500 text-white text-base"
                            : "inline-flex items-center font-semibold pl-1.5 w-full hover:text-blue-600 text-base  border-x-2 border-blue-600 rounded-md py-1.5"
                    }
                    to="addJob"
                >
                    <MdAddTask />
                    <span className="ml-2.5">Add Job</span>
                </NavLink>
            </li>
            {/* job list */}
            <li className="relative px-2 py-0 ">
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? "inline-flex items-center bg-blue-700 w-full pl-2 pr-2 py-2 font-bold rounded-lg border border-blue-500 text-white text-base"
                            : "inline-flex items-center font-semibold pl-1.5 w-full hover:text-blue-600 text-base  border-x-2 border-blue-600 rounded-md py-1.5"
                    }
                    to="joblists"
                >
                    <MdAddTask />
                    <span className="ml-2.5">Job Lists</span>
                </NavLink>
            </li>
        </>
    );

    return (
        <div
            className={`flex h-screen bg-white ${isSideMenuOpen ? "overflow-hidden" : ""
                }`}
        >
            {/* Dashboard */}
            <aside className="z-20 flex-shrink-0 fixed hidden w-60 mt-14 overflow-y-auto no-scrollbar bg-white lg:block 4xl:ml-[12%] 3xl:ml-[11%] 2xl:ml-[13%] xl:ml-2 rounded-lg ">
                <div className="2xl:h-[80vh] xl:h-[98vh] lg:h-[88.5vh] py-3 flex flex-col lg:justify-between gap-9 ">
                    {/* logo */}
                    <div>
                        <p className="font-bold text-lg px-4">Admin Dashboard</p>
                    </div>
                    {/* items and routes */}
                    <div className=" flex flex-col justify-between">
                        <ul className="space-y-3">{navlinks}</ul>
                    </div>
                    {/* footer */}
                    <div className="flex -mt-3 justify-center items-center px-4">
                        <p>Copyright © 2024 - All right reserved by VIP Tailors</p>
                    </div>
                </div>
            </aside>
            <div className="fixed inset-0 -z-10 flex items-end bg-slate-300 bg-opacity-50 sm:items-center sm:justify-center"></div>
            {/* responsive dashboard */}
            <aside
                className={`z-20 fixed duration-300 w-64 inset-y-0 ease-in-out overflow-y-auto bg-white ${isSideMenuOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:hidden`}
            >
                <div className="h-screen md:py-3 pl-3 flex flex-col justify-between shadow-xl">
                    {/* logo */}
                    <div>
                        <h1 className="text-2xl">VIP Tailor</h1>
                    </div>
                    {/* items and routes */}
                    <div className=" flex flex-col pt-5 justify-between">
                        <ul className="leading-8" onClick={() => closeSideMenu()}>
                            {navlinks}
                        </ul>
                    </div>
                    {/* footer */}
                    <div className="flex justify-center items-center">
                        <p className="text-xs lg:text-base">
                            Copyright © 2024 - All right reserved by VIP Tailors
                        </p>
                    </div>
                </div>
            </aside>
            {/* components */}
            <div className="flex flex-col flex-1 w-full overflow-y-auto bg-[#f6f5f5]">
                <header className="z-40 py-5 bg-slate-50 fixed w-full top-0 lg:hidden">
                    <div className="flex items-center justify-between h-8 px-6 mx-auto">
                        <button
                            className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
                            onClick={toggleSideMenu}
                            aria-label="Menu"
                        >
                            {isSideMenuOpen ? (
                                <FaXmark className="w-6 h-6" />
                            ) : (
                                <FaBarsStaggered className="w-6 h-6" />
                            )}
                        </button>
                        <div className="flex lg:hidden justify-end mr-4 w-full">
                            <button className="btn btn-sm">
                                {/* <IoPersonOutline className="text-xl" /> */}
                                Log Out
                            </button>
                        </div>
                    </div>
                </header>
                <main className="scroll-smooth">
                    <div className="">
                        <Navbar></Navbar>
                    </div>
                    <div className="4xl:ml-[25%] 4xl:mr-[225px] 3xl:ml-[26%] 3xl:mr-[10%] lg:h-[83vh] 2xl:ml-[29%] 2xl:mr-[12%] xl:ml-[22%] xl:mr-3 lg:ml-[285px] lg:mr-5 mt-0">
                        <Outlet></Outlet>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;