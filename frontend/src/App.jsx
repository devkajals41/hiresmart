import { BrowserRouter, Route, Routes } from "react-router-dom";
import AtsReport from "./pages/ats/AtsReport";
import Dashboard from "./pages/dashboard/Dashboard";
import Feedback from "./pages/feedback/Feedback";
import MockInterview from "./pages/interview/MockInterview";
import Landing from "./pages/landing/Landing";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Resume from "./pages/resume/Resume";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/resume"
					element={
						<ProtectedRoute>
							<Resume />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/ats"
					element={
						<ProtectedRoute>
							<AtsReport />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/interview"
					element={
						<ProtectedRoute>
							<MockInterview />
						</ProtectedRoute>
					}
				/>
				{/* AI Feedback report after a mock interview session */}
				<Route
					path="/feedback"
					element={
						<ProtectedRoute>
							<Feedback />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/profile"
					element={
						<ProtectedRoute>
							{" "}
							<h1>Profile</h1>{" "}
						</ProtectedRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
