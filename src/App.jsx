import React, { useState,useEffect } from 'react';
import axios from 'axios';


const useDebounce = (value, delay) => {

  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    
    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
};



const SearchBar = () => {
  const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const debouncedValue=useDebounce(users,500);

    useEffect(() => {
      axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
          .then(response => {
              setUsers(response.data.user);
          })
  }, [filter])

  return (
    <div>
    <input
      type="text"
      onChange={(e) => setUsers(e.target.value)}
      placeholder="Search..."
    />
    <div>{users.map(user => <User user={user} />)}</div>
    </div>
  );
};

function User({user}){
  return (
    <div>
      {user.firstName}{user.lastName}
    </div>
  )
}

export default SearchBar;