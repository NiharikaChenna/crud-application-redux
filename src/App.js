import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
// import AddContact from './components/AddContact';
// import EditContact from './components/EditContact';
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Contacts from "./components/Contacts";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Contacts />} />
        <Route path="/edit/:id" element={<Contacts />} />
      </Routes>
    </div>
  );
}

export default App;
