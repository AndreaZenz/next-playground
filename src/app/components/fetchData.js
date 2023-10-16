//why am i using use client????//
// https://stackoverflow.com/questions/74965849/youre-importing-a-component-that-needs-usestate-it-only-works-in-a-client-comp
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

function FetchData() {
  // array destructuring   (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment), questo array contiene il valore ricavato dall'api
  const [data, setData] = useState([]);

  //The useEffect hook is called in a component after the first render and every time the component updates.
  useEffect(() => {
    // axios (libreria npm) ci permette di effettuare la get a mocky, e nel then prendiamo la risposta e utilizzando il setData (dell'array deconstructure)
    axios
      .get("https://run.mocky.io/v3/2989875a-d0f8-405f-bfe8-70418f4ff3cb")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const refreshData = () => {
    axios
      .get("http://localhost:3000/api/raw-events")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  // conditionally rendering table depending on the data

  let table;
  if (data) {
    table = (
      <table className="table">
        <thead>
          <tr>
            <th>Header Id</th>
            <th>Header Timestamp</th>
            <th>Telecontrol id</th>
            <th>Header Type</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.header_id_co}</td>
                <td>{user.header_timestamp}</td>
                <td>{user.telecontrol_id}</td>
                <td>{user.header_type}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  } else {
    table = (
      <table className="table">
        <thead>
          <tr>
            <th>Header Id</th>
            <th>Header Timestamp</th>
            <th>Telecontrol id</th>
            <th>Header Type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <div className="container">
      <div className="mt-3">
        <div className="d-flex">
          <h3>Fetch Data from API</h3>
          <button className="btn btn-success" onClick={refreshData}>
            Refresh API
          </button>
        </div>
        {table}
      </div>
    </div>
  );
}

export default FetchData;
