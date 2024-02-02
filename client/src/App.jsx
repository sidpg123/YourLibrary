
import {
	BrowserRouter,
	Route,
	Routes,
	Navigate
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
	return (
		<>
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
