import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");

  const id = useParams();
  console.log(id.id);
  const navigate = useNavigate();

  const getSingleUser = async () => {
    const response = await fetch(`http://localhost:5000/${id.id}`);
    const data = await response.json();

    if (!response.ok) {
      console.log(data);
      setError(data.error);
    }

    if (response.ok) {
      console.log(data);
      setError("");
      setName(data.singleUser.name);
      setEmail(data.singleUser.email);
      setAge(data.singleUser.age);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = { name, email, age };
    const response = await fetch(`http://localhost:5000/${id.id}`, {
      method: "POST",
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.log(data);
      setError(data.error);
    }

    if (response.ok) {
      setError("");
      console.log(data);
      navigate("/all");
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <div className="container my-2">
      <h2 className="text-center">Enter the Data</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;
