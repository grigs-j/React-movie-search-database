import React from "react";
//routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//importing component module
import Header from "./components/Header";
import Home from "./components/Home";
import Movie from "./components/Movie";
import NotFound from "./components/NotFound";
//styles
import { GlobalStyle } from "./GlobalStyle";

const App = () => (
    // creating route defaults and params
    <Router>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            //
            <Route path="/:movieId" element={<Movie />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
        <GlobalStyle />
    </Router>
);

export default App;
