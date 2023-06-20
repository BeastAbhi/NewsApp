
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API
  state = {
    progress: 0
  }
  setProgress = (progress) =>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div className='bg-dark' style={{color: "white"}}>

        <Router>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}

      />
            <Routes>

              <Route path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey}   key='General' pageSize={6} country="in" category="General"/>}></Route>
              <Route path="/Business" element={ <News setProgress={this.setProgress} apiKey={this.apiKey}  key='business'  pageSize={6} country="in" category="Business"/>}></Route>
              <Route path="/Entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key='entertainment'  pageSize={6} country="in" category="Entertainment"/>}></Route>
              <Route path="/General" element={ <News setProgress={this.setProgress} apiKey={this.apiKey}  key='general'  pageSize={6} country="in" category="General"/>}></Route>
              <Route path="/Health" element={ <News setProgress={this.setProgress} apiKey={this.apiKey}  key='health'  pageSize={6} country="in" category="Health"/>}></Route>
              <Route path="/Science" element={ <News setProgress={this.setProgress} apiKey={this.apiKey}  key='science'  pageSize={6} country="in" category="Science"/>}></Route>
              <Route path="/Sports" element={ <News setProgress={this.setProgress} apiKey={this.apiKey}  key='sports'  pageSize={6} country="in" category="Sports"/>}></Route>
              <Route path="/Technology" element={ <News setProgress={this.setProgress} apiKey={this.apiKey}   key='technology}>' pageSize={6} country="in" category="Technology"/>}></Route>
   
            </Routes>
        </Router>
      </div>
    )
  }
}

