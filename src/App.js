import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./Components/SearchPage"
import MyBookShelfPage from "./Components/MyBookShelfPage"
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SearchPage/>}/>
      <Route path="/MyBooks" element={<MyBookShelfPage/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
