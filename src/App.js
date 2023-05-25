
import './App.css';

import React, { useState } from 'react'
import Navbar from './component/Navbar';
import News from './component/News';

import {BrowserRouter as Router,Routes,Route,} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


const App= ()=>{
  const pageSize = 15;

 const [progress, setProgress] = useState(0)




    return (
      <Router>
        <div>
        <LoadingBar
               height={3}
              color='#f11946'
              progress={progress}
            />
           <Navbar  style={{position: "sticky"}}/>
           

          <Routes>

            <Route path='/' element={<News setProgress={setProgress} key='general' pageSize={pageSize} country='us' category='general' />}></Route>
            <Route path='/business' element={<News setProgress={setProgress} key='business' pageSize={pageSize} country='us' category='business' />}></Route>
            <Route path='/entertainment' element={<News setProgress={setProgress} key='entertainment' pageSize={pageSize} country='us' category='entertainment' />}></Route>
            <Route path='/health' element={<News setProgress={setProgress} key='health' pageSize={pageSize} country='us' category='health' />}></Route>
            <Route path='/science' element={<News setProgress={setProgress} key='science' pageSize={pageSize} country='us' category='science' />}></Route>
            <Route path='/sports' element={<News setProgress={setProgress} key='sports' pageSize={pageSize} country='us' category='sports' />}></Route>
            <Route path='/technology' element={<News setProgress={setProgress} key='technology' pageSize={pageSize} country='us' category='technology' />}></Route>
          </Routes>
        </div>
      </Router>

    )
  }


  export default App