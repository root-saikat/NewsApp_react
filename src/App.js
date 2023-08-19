import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Footer from './Components/Footer';



export default class App extends Component {
  render() {

    const pageSize = 6;
    const apiKey = "97ecad9c95754c2ebb28927a8cf1947d"

    return (
      <div id='main-container'>
        <BrowserRouter>
            <Navbar navTitle='Top-News'/>
            <Routes>
                  <Route exact path="/" element={<News apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general"/>}>
                  </Route> 
                  <Route exact path="/business" element={<News apiKey={apiKey} key="business" pageSize={pageSize} country="in" category="business"/>}>
                  </Route> 
                  <Route exact path="/entertainment" element={<News apiKey={apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment"/>}>
                  </Route> 
                  <Route exact path="/general" element={<News apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general"/>}>
                  </Route> 
                  <Route exact path="/health" element={<News apiKey={apiKey} key="health" pageSize={pageSize} country="in" category="health"/>}>
                  </Route> 
                  <Route exact path="/science" element={<News apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science"/>}>
                  </Route> 
                  <Route exact path="/sports" element={<News apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports"/>}>
                  </Route> 
                  <Route exact path="/technology" element={<News apiKey={apiKey} key="technology" pageSize={pageSize} country="in" category="technology"/>}>
                  </Route> 
            </Routes>
            <Footer/>
        </BrowserRouter>
      </div>
    )
  }
}
