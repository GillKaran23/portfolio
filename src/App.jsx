import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./homescreen";
import AboutMe from "./Components/AboutMe";
import MyName from "./Components/MyName";
import Skills from "./Components/Skills";
import AdminLogin from "./AdminLogin";
import AdminHomePage from "./AdminHomePage";
import ErrorPage from "./errorpage";
import Experience from "./Components/Experience";
import Projects from "./Components/Projects";

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route element={<HomeScreen/>} path="/"></Route>
        <Route element={<AboutMe/>} path="/#aboutMe"></Route>
        <Route element={<MyName/>} path="/#home"></Route>
        <Route element={<Skills/>} path="/#skills"></Route>
        <Route element={<Experience/>} path="/#experience"></Route>
        <Route element={<Projects/>} path="/#projects"></Route>
        <Route element={<AdminLogin/>} path="/admin"></Route>
        <Route element={<AdminHomePage/>} path="/adminhome" ></Route>
        <Route element={<ErrorPage/>} path="*" ></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
