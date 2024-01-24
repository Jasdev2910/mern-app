import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  console.log(data);

  const getData = async () => {
    const response = await fetch("http://localhost:5000");
    const data = await response.json();

    if (!response.ok) {
      console.log(data.error);
      setError(data.error);
    }

    if (response.ok) {
      setData(data);
      console.log(data);
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      console.log(data);
      setError(data.error);
    }

    if (response.ok) {
      setError("data removed successfully");

      getData();
      setTimeout(() => {
        setError("");
      }, 1000);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container my-2">
      <h2 className="text-center">All Data</h2>
      {error && (
        <div class="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="row">
        {data?.allData?.map((card) => (
          <div key={card._id} className="col-3 p-2">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{card.name}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  {card.email}
                </h6>
                <p className="text-muted">Age : {card.age}</p>
                <button
                  className="btn btn-primary m-2"
                  onClick={() => handleDelete(card._id)}
                >
                  Delete
                </button>
                <Link to={`/${card._id}`}>
                  <button className="btn btn-primary">Update</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;
