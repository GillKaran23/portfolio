import AboutMe from "./Components/AboutMe";
import Experience from "./Components/Experience";
import Footer from "./Components/footer";
import MyName from "./Components/MyName";
import NavBar from "./Components/Navbar";
import Projects from "./Components/Projects";
import Skills from "./Components/Skills";
import UpButton from "./Components/upButton";

let HomeScreen = ()=>{
    return(
        <>
        <NavBar/>
        <MyName/>
        <AboutMe/>
        <Skills/>
        <Experience/>
        <Projects/>
        <UpButton/>
        <Footer/>
        </>
    )
}
export default HomeScreen;