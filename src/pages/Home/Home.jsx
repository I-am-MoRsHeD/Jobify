import { useCallback, useEffect, useState } from "react";
import AdminDashboard from "../Dashboard/AdminDashboard/AdminDashboard";
import Login from "../Login/Login";
import useAdmin from "../../hooks/useAdmin";
import { useSelector } from "react-redux";


const Home = () => {
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    const [isAdmin, isAdminLoading] = useAdmin();
    const { user } = useSelector((state) => state.userSlice);
    const userFromLocal = localStorage.getItem('user');

    console.log(user);

    const toggleSideMenu = useCallback(() => {
        setIsSideMenuOpen((prevState) => !prevState);
    }, []);

    const closeSideMenu = useCallback(() => {
        setIsSideMenuOpen(false);
    }, []);

    if (isAdminLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-dots loading-lg "></span>
            </div>
        );
    }

    return (
        <div>
            {
                isAdmin || userFromLocal ? (<AdminDashboard
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