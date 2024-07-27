import { useCallback, useState } from "react";
import AdminDashboard from "../Dashboard/AdminDashboard/AdminDashboard";
import Login from "../Login/Login";
import useAdmin from "../../hooks/useAdmin";


const Home = () => {
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    // const [isAdmin, isAdminLoading] = useAdmin();
    const user = localStorage.getItem('user');
    // console.log(isAdmin);
    const toggleSideMenu = useCallback(() => {
        setIsSideMenuOpen((prevState) => !prevState);
    }, []);

    const closeSideMenu = useCallback(() => {
        setIsSideMenuOpen(false);
    }, []);

    const isAdmin = user ? true : false;

    // if (isAdminLoading) {
    //     return (
    //         <div className="flex justify-center items-center h-screen">
    //             <span className="loading loading-dots loading-lg "></span>
    //             {/* <span className="text-xl font-bold ">Loading.....admin</span> */}
    //         </div>
    //     );
    // }

    return (
        <div>
            {
                isAdmin ? (<AdminDashboard
                    isSideMenuOpen={isSideMenuOpen}
                    toggleSideMenu={toggleSideMenu}
                    closeSideMenu={closeSideMenu}
                />)
                    : <Login />
            }
        </div>
    );
};

export default Home;