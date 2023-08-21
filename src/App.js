import './App.css';
import React, {useState} from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Footer from './Components/Footer';
import LoadingBar from 'react-top-loading-bar'

const App =()=> {

  const pageSize = 6;
  const apiKey = process.env.REACT_APP_API_KEY;

  const [progress, setProgress] = useState(0)

    return (
      <div id='main-container'>
        <BrowserRouter>
            <LoadingBar
              color='#157347'
              progress={progress}
              waitingTime ='300'
              loaderSpeed= '300'
            />
            <Navbar navTitle='Top-News'/>
            <Routes>
                  <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="home" pageSize={pageSize} country="in" category="general"/>}>
                  </Route> 
                  <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="in" category="business"/>}>
                  </Route> 
                  <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment"/>}>
                  </Route> 
                  <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general"/>}>
                  </Route> 
                  <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="in" category="health"/>}>
                  </Route> 
                  <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science"/>}>
                  </Route> 
                  <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports"/>}>
                  </Route> 
                  <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="in" category="technology"/>}>
                  </Route> 
            </Routes>
            <Footer/>
        </BrowserRouter>
      </div>
    )
}


export default App;