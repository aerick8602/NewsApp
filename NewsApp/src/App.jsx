import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import News from './components/News';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false,
    };
  }

  toggleDarkMode = () => {
    this.setState(prevState => ({
      isDarkMode: !prevState.isDarkMode,
    }));
  };

  render() {
    const { isDarkMode } = this.state;
    const appClass = isDarkMode ? "app dark-mode" : "app light-mode";

    return (
      <div className={appClass}>
        <Router>
          <Navbar isDarkMode={isDarkMode} toggleDarkMode={this.toggleDarkMode} />
          <Routes>
            <Route exact path="/" element={<News key="general" pageSize={6} country="in" category="general" isDarkMode={isDarkMode} />} />
            <Route exact path="/business" element={<News key="business" pageSize={6} country="in" category="business" isDarkMode={isDarkMode} />} />
            <Route exact path="/entertainment" element={<News key="entertainment" pageSize={6} country="in" category="entertainment" isDarkMode={isDarkMode} />} />
            <Route exact path="/general" element={<News key="general" pageSize={6} country="in" category="general" isDarkMode={isDarkMode} />} />
            <Route exact path="/health" element={<News key="health" pageSize={6} country="in" category="health" isDarkMode={isDarkMode} />} />
            <Route exact path="/science" element={<News key="science" pageSize={6} country="in" category="science" isDarkMode={isDarkMode} />} />
            <Route exact path="/sports" element={<News key="sports" pageSize={6} country="in" category="sports" isDarkMode={isDarkMode} />} />
            <Route exact path="/technology" element={<News key="technology" pageSize={6} country="in" category="technology" isDarkMode={isDarkMode} />} />
          </Routes>
        </Router>
      </div>
    );
  }
}
