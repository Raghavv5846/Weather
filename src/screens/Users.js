import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { useWeather } from "../contextApi/WeatherContext";
import Button2 from "../components/Button2";
import Sort from "../components/Sort";
let data = [
  {
    userName: "raghav",
    dateAdded: "2024-02-04",
    status: "Active",
  },
  {
    userName: "nikhil",
    dateAdded: "2024-02-03",
    status: "Inactive",
  },
];
export default function Users() {
  const [tableData, setTableData] = useState(data);
  const [userform, setUserform] = useState(false);
  const [username, setUsername] = useState("");
  const [date, setDate] = useState("");
  const [userdeleted,setUserdeleted]=useState(false);

  const { weather } = useWeather();
  const handleAction = (action, index) => {
    setTableData((prevTableData) =>
      prevTableData.filter((item, i) => i !== index)
    );

    setUserdeleted(true);
  };
  const setform = () => {
    setUserform(false);
  };
  const setinfo = (user, date) => {
   
    setUsername(user);
    setDate(date);
  };
  const setInactive = function (item, index) {
    setTableData((pre) => {
      const updatedData = [...pre];
      
      updatedData[index].status =
        pre[index].status === "Active" ? "Inactive" : "Active";
      return updatedData;
    });
  };
  const filterstatus = (select) => {
    setTableData((pre) => {
      let updatedData = [...data];
      updatedData = updatedData.filter((e) => e.status === select);
      return updatedData;
    });
  };

  const searchdate=(date)=>{
      setTableData((pre)=>{
          let updatedData = [...data];
          updatedData = updatedData.filter(
            (e) => new Date(e.dateAdded).getTime() === new Date(date).getTime()
          )
      return updatedData;
    })
  }
  const sort=(text)=>{
    console.log(text);
    if(text==="Username"){
          setTableData((pre)=>{
            return pre.sort((a, b) => {
                const userNameA = a.userName.toLowerCase();
                const userNameB = b.userName.toLowerCase();
                return userNameA.localeCompare(userNameB);
              });
          });
          setUserdeleted(true)
          
    }
    else if(text==="Date"){
        const updated=data.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
        setTableData(updated);
        setUserdeleted(true)
    }
  }
  useEffect(() => {
    if (userdeleted) {
      data = [...tableData];
      setUserdeleted(false); 
    }
  }, [userdeleted]);
  useEffect(() => {
    if (username.length > 0 && date.length > 0) {
      
      data.push({ userName: username, dateAdded: date, status: "Inactive" });
      setTableData(data);
      setUsername("");
      setDate("");
      setUserform(false);
      setUserdeleted(true)
      
    }
    
  }, [username,tableData]);
  return (
    <>
      {weather && (
        <div>
          <Navbar
            location={weather.location.name}
            country={weather.location.country}
          />
          <div className="p-8 flex">
            <Button2 status={filterstatus} searchdate={searchdate} />
            <Sort sort={sort}/>
          </div>
          <div style={{ padding: "25px", position: "relative", zIndex: "0" }}>
            <div>
              <table className="table-auto min-w-full text-sm text-left shadow-lg border-black border-1">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Username</th>
                    <th className="px-4 py-2">Date Added</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((item, index) => (
                    <Tabledata
                      item={item}
                      index={index}

                      setInactive={setInactive}
                      handleAction={handleAction}
                      setUserform={setUserform}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {tableData.length === 0 && (
        <button
          onClick={() => setUserform(true)}
          type="button"
          class=" my-5 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 
              focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 
              text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 
              dark:focus:ring-blue-800"
          style={{ marginLeft: "45%" }}
        >
          Add a User
        </button>
      )}
      {userform ? (
        <Adduser setform={setform} setinfo={setinfo} tableData={tableData} />
      ) : (
        ""
      )}
    </>
  );
}

function Adduser({ setform, setinfo, tableData }) {
  const [user, setUser] = useState("");
  const [date, setDate] = useState("");
  const [isuser, setIsUser] = useState(false);
  useEffect(() => {
    let arr = tableData.filter((e) => e.userName === user);
    if (arr.length) {
      setIsUser(true);
    }
    if (!arr.length) {
      setIsUser(false);
    }
  }, [user]);

  return (
    <form
      className="rounded"
      style={{
        border: "1px solid black",
        width: "28rem",
        padding: "5rem",
        position: "fixed",
        left: "35%",
        top: "10%",
        backgroundColor: "honeydew",
        zIndex: "1",
      }}
    >
      <div className="border-b border-gray-900/10 pb-12">
        <h1 className="text-base font-semibold leading-7 text-gray-900 text-4xl">
          Add a user
        </h1>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              First name
              <br />
              {isuser && (
                <p style={{ color: "red" }}>*this username is already taken</p>
              )}
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                onChange={(e) => setUser(e.target.value)}
                className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Date
            </label>
            <div className="mt-2">
              <input
                required
                id="email"
                name="email"
                type="date"
                autoComplete="date"
                onChange={(e) => setDate(e.target.value)}
                className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <button
          disabled={isuser}
          onClick={() => setinfo(user, date)}
          type="button"
          class="my-5 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 
              focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 
              text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 
              dark:focus:ring-blue-800"
        >
          Add
        </button>
        <button
          type="button"
          class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          onClick={setform}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
function Tabledata({ index, item, setInactive, handleAction, setUserform }) {
  return (
    <tr>
      <td className="px-4 py-2">{item.userName}</td>

      <td className="px-4 py-2">{item.dateAdded}</td>
      <td className="px-4 py-2">
        <Button
          value={item.status}
          color={item.status === "Inactive" ? "red" : "green"}
          item={item}
          index={index}
          setinactive={setInactive}
        />
      </td>
      <td className="px-4 py-2">
        <button
          style={{
            border: "1px solid black",
            borderRadius: "8px",
            padding: "5px",
            backgroundColor: "green",
            color: "whitesmoke",
          }}
          onClick={() => setUserform(true)}
        >
          Add
        </button>
        <button
          style={{
            border: "1px solid black",
            borderRadius: "8px",
            padding: "5px",
            marginLeft: "6px",
          }}
          onClick={() => handleAction("Delete", index)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
