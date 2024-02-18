import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { ConfigProvider, Table } from 'antd';
import toast from 'react-hot-toast';

export default function UserDashboard() {
  const [dataSource, setDataSource] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/v1/user/bulk?filter=' + filter, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then((response) => {
        const result = response.data;
        console.log(result);
        setDataSource(result.Books);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [filter]);

  const [buttonPressedState, setButtonPressedState] = useState({});

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Author',
      dataIndex: 'author',
    },
    {
      title: 'Available',
      dataIndex: 'available',
      render: (text) => (text ? 'Yes' : 'No'),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => (
        <div className='flex'>
          <div>
            {record.available ? (
              <button
                onClick={() => handleButtonClick(record)}
                style={{ color: 'green', fontWeight: 'bold', padding: "5px", textDecoration: 'underline' }}
                disabled={buttonPressedState[record.id]}
              >
                {buttonPressedState[record.id] ? 'Requested' : 'Request'}
              </button>
            ) : (
              <button disabled>Unavailable</button>
            )}
          </div>
        </div>
      ),
    },
  ];

  const handleButtonClick = async (record) => {
    // Check if the button is already requested
    if (!buttonPressedState[record.id]) {
      // Implement your button click logic here
      const response = await axios.post('http://localhost:3000/api/v1/user/requestbook', {
        id: record._id
      }, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      console.log('Request successful:', response.data);
      toast.success(response?.data.message);
      // console.log('Button clicked for record:', record);
      // Update the buttonPressedState to mark the button as requested
      // Update the specific record in dataSource
      setDataSource((prevDataSource) =>
        prevDataSource.map((item) =>
          item.id === record.id ? { ...item, buttonPressed: true } : item
        )
      );

      // Update buttonPressedState for the specific record
      setButtonPressedState((prevButtonPressedState) => ({
        ...prevButtonPressedState,
        [record.id]: true,
      }));
      // Perform any other necessary actions
    }
  };

  return (
    <>
      <Navbar
        link1='/issuedbooks'
        stat1='Issued books'
        link2='/signout'
        stat2='Sign out'
        link3='/'
        stat3='Home'
      />
      <ConfigProvider
        theme={{
          components: {
            Table: {
              borderColor: 'lightblue',
              headerBg: '#bae0ff',
            },
          },
        }}
      >
        <div className='mt-20 mb-4 flex justify-center align-middle'>
          <input
            type='text'
            className='w-1/2 px-2 py-1 border rounded border-blue-600'
            placeholder='Search for books...'
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <Table columns={columns} dataSource={dataSource} />
      </ConfigProvider>
    </>
  );
}
