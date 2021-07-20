import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [usersList, setUsersList] = useState([]);

  const addUser = async () => {
    const data = {
      firstName: firstName,
      lastName: lastName,
      age: age,
    };

    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const res = await fetch(
        "https://gutorial-backend.herokuapp.com/users",
        settings
      );
      if (res.ok) {
        return res.json();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUsers = async () => {
    try {
      const res = await fetch("https://gutorial-backend.herokuapp.com/users");
      const data = await res.json();
      if (res.ok) {
        setUsersList(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, [usersList]);

  return (
    <div className="App">
      <div>
        <label htmlFor="">First Name:</label>
        <input
          type="text"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <label htmlFor="">Last Name:</label>
        <input
          type="text"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <label htmlFor="">Age:</label>
        <input
          type="number"
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
      </div>

      <button onClick={addUser}>Submit</button>

      <div className="usersList">
        {usersList.map((user) => (
          <div key={user.id}>
            <h3>{user.firstName}</h3>
            <h2>{user.lastName}</h2>
            <h5>{user.age}</h5>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
