"use client";
import { useState, useEffect, useMemo } from "react";
import { TableRow } from "./Components/TableRow/TableRow";
import axios from "axios";
export default function Home() {
  const [users, setusers] = useState([]);
  const [activeRowId, setActiveRowId] = useState(2);
  const [details, setDetails] = useState({});
  const [searchDetails, setSearchDetails] = useState([]);

  const getActiveRow = (userid) => {
    setActiveRowId(userid);
  };
  const handleSearchBox = (e) => {
    const { value } = e.target;
    const newData = users.filter((item) => {
      let firstName = item.firstName.toLowerCase();
      if (firstName.includes(value.toLowerCase())) {
        return item;
      }
    });
    setSearchDetails(newData);
  };

  useMemo(() => {
    setDetails({ ...users[activeRowId] });
    console.log({ ...users[activeRowId] }.address);
  }, [activeRowId, users]);
  useEffect(() => {
    axios
      .get("https://admin-panel-data-edyoda-sourav.vercel.app/admin/data")
      .then((res) => setusers(res.data));
  }, []);

  return (
    <main>
      <div id="table-section">
        <form>
          <input
            type="text"
            placeholder="Enter something"
            name="search-box"
            id="search-box"
            onChange={handleSearchBox}
          />
        </form>

        <div id="table-wrapper">
          <div id="table-headers">
            <table>
              <thead>
                <tr>
                  <th className="column1">Id</th>
                  <th className="column2">FirstName</th>
                  <th className="column3">LastName</th>
                  <th className="column4">Email</th>
                  <th className="column5">Phone</th>
                </tr>
              </thead>
            </table>
          </div>

          <div id="table-data">
            <table>
              <tbody>
                {!searchDetails.length > 0
                  ? users.map((item, idx) => (
                      <TableRow
                        activeId={activeRowId}
                        getId={getActiveRow}
                        user={item}
                        rowNo={idx}
                        key={idx}
                      />
                    ))
                  : searchDetails.map((item, idx) => (
                      <TableRow
                        activeId={activeRowId}
                        getId={getActiveRow}
                        user={item}
                        rowNo={idx}
                        key={idx}
                      />
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* <!-- Details box --> */}

      {Object.keys(details).length > 0 && (
        <div id="info-wrapper">
          <h1>Details</h1>
          <p>Click on a table item to get detailed information</p>
          <div id="info-content">
            <div>
              <b>User selected:</b>{" "}
              {details.firstName + "  " + details.lastName}
            </div>
            <div>
              <b>Description: </b>
              <div>{details.description}</div>
            </div>
            <div>
              <b>Address:</b> {details.address.streetAddress}
            </div>
            <div>
              <b>City:</b> {details.address.city}
            </div>
            <div>
              <b>State:</b> {details.address.state}
            </div>
            <div>
              <b>Zip:</b> {details.address.zip}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
