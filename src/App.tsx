import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Routes/Components/Header";

import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/tv" element={<Tv />} />
        <Route path="/search" element={<Search />} />
        <Route path="/" element={<Home />} />
        <Route path="/movies/:movieId" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
