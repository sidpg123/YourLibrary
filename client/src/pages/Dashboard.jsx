import React from 'react';
import dash from '../assets/dash2.png';
import Navbar from '../components/Navbar';

export default function Dashboard() {
	return (
		<div className="relative w-screen  h-screen">
			<img src= {dash} className='absolute w-full h-full object-cover bg-fixed z-0 '></img>
			<div className="bg-cover bg-center h-full flex items-center">
			<Navbar />
			<div className="inset-0 bg-slate-900 p-8 rounded-3xl bg-opacity-5 backdrop-filter backdrop-blur-lg flex items-center justify-center">
				<h1 className="text-white text-center text-6xl font-serif">Let's explore <br /> the World of Books</h1>
			</div>
			</div>
		</div>
	);
}
