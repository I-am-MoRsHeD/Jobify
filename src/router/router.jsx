import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AddCompany from "../pages/AddCompany/AddCompany";
import CompanyLists from "../pages/CompanyLists/CompanyLists";
import AddJob from "../pages/AddJob/AddJob";
import JobLists from "../pages/JobLists/JobLists";
import CompanyInfo from "../pages/CompanyInfo/CompanyInfo";

  const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Login />
            },
            {
                path: '/addCompany',
                element: <AddCompany />
            },
            {
                path: '/companyLists',
                element: <CompanyLists />
            },
            {
                path: '/addJob',
                element: <AddJob />
            },
            {
                path: '/jobLists',
                element: <JobLists />
            },
            {
                path: '/company/:id',
                element: <CompanyInfo />
            },
        ]
    }
  ])

  export default router;