import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from "axios";
import { Table } from 'antd';


export default function UserDashboard() {
  const [columns, setColumns] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [filter, setFilter] =  useState("");
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {
      headers: {
        'Authorization' : localStorage.getItem("token")
      }
    } )
      .then((response) => {
        const result = response.data; // Use response.data instead of res.json()
        console.log(result)
        const list = result.Books;
        const firstObject = list[0];
        const cols = [];
  
        for (const element in firstObject) {
          if (Object.prototype.hasOwnProperty.call(firstObject, element)) {
            const col = {
              title: element,
              dataIndex: element,
            };
            cols.push(col);
          }
        }
        setColumns(cols);
        setDataSource(result.Books);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [filter]);  


  return (
    <>
      <Navbar link1="/issuedbooks" stat1="Issued books" link2="/signout" stat2="Sign out" link3="/" stat3="Home" />
      {/* <div>This is userdashboard</div> */}
        <div className='my-2' >
            <input type='text' className="w-full px-2 py-1 border rounded border-slate-200" placeholder='Search for books' onChange={(e) => {
                setFilter(e.target.value)
            }} ></input> 
        </div>
        <Table columns={columns} dataSource={dataSource} />;
    </>
  )
}
