import AdminAbout from "./AdminComponents/AdminAbout";
import AdminExperience from "./AdminComponents/AdminExperience";
import AdminNavBar from "./AdminComponents/AdminNavbar";
import AdminProjects from "./AdminComponents/AdminProject";
import AdminSkills from "./AdminComponents/AdminSkills";

let AdminHomePage = ()=>{
    return(
        <>
        <AdminNavBar/>
        <AdminAbout/>
        <AdminSkills/>
        <AdminExperience/>
        <AdminProjects/>
        </>
    )
} 
export default AdminHomePage;