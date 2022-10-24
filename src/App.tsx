import React from 'react';
import './App.css';
import Navbar from "./Components/Navbar";
import Content from "./Components/Content";

const App = () => {
    return (<div className="App">
        <header>
            <Navbar/>
        </header>
        <section>
            <Content videoId="S5FyS7tQuUw"/>
        </section>
    </div>);
}

export default App;
