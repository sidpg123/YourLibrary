import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { ConfigProvider, Table } from 'antd';
import toast from 'react-hot-toast';
import ShowBooks from '../components/ShowBooks';

export default function UserDashboard() {
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
      <ShowBooks />
    </>
  );
}
