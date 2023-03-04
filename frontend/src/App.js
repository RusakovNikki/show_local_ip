import axios from './axios';
import { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    axios.get('/getData').then(res => console.log(res))
  })
  return (
    <div></div>

  )
}

export default App;
