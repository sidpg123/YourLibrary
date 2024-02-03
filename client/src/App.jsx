
import {
	BrowserRouter,
	Route,
	Routes,
	Navigate
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { Toaster } from 'react-hot-toast';


function App() {
	return (
		<>
			<Toaster position="top-center" reverseOrder={false}/>
			<BrowserRouter>
				<Routes>
					<Route path="/signup" element={<Login />} />
					<Route path="/" element={<Navigate to="/dashboard" replace />} />
					<Route path="/dashboard" element={<Dashboard />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
