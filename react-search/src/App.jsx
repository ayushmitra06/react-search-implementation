import { useEffect, useState } from 'react'
import './App.css'
import { Users } from './users'
import Table from './Table';
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  useEffect(()=>{
    const fetchUsers = async() => {
      const res = await axios.get(`http://localhost:5000/?q=${query}`)
      setData(res.data)
    };
    if (query.length === 0 || query.length > 2) fetchUsers()
  },[query])

  const handleSearch = (e) => {
    const value = e.target.value.trim().toLowerCase();
    setQuery(value); // Set query normally

    if (value.includes(" ")) {
      // If the input contains whitespace, split into separate terms
      const [firstName, lastName] = value.split(" ");
      setQuery(`firstName=${firstName}&lastName=${lastName}`);
    } else {
      // If the input is a single term, set it normally
      setQuery(value);
    }
  }

  return (
    <div className='app'>
      <input type="text" 
      placeholder='Search...' 
      className="search" 
      onChange={handleSearch}/>
      <Table  data={data}/>
      
    </div>
  )
}

export default App
