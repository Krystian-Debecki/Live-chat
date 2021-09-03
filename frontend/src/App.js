import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import StartingPage from './components/starting-page/starting-page';
import PickRoom from './components/pickRoom/pickRoom';
import Room from './components/Room/room';

import { useState } from 'react'

import { io } from 'socket.io-client'
const socket = io('http://localhost:3200')

function App() {
  const [name,setName] = useState()
  const [error,setError] = useState()

  socket.on('Error', req => setError(req.message))

  return (
    <div className="App">
      <Router>
        <Switch>

          <Route path="/pickRoom">
            <PickRoom name={name} socket={socket} error={error} setError={setError}/>
          </Route>

          <Route path="/room/:room" >
            <Room name={name} socket={socket}/>
          </Route>

          <Route exact path="/">
            <StartingPage name={name} setName={setName}/>
          </Route>

        </Switch>
      </Router>

      <img src="./bg.png" className="App__background"/>
    </div>
  );
}

export default App;
