import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import DashboardHome from "./pages/DashboardHome";
import ReaderManagement from "./pages/ReaderManagement";
import BookManagement from "./pages/BookManagement";
import LendingManagement from "./pages/LendingManagement";
import OverdueManagement from "./pages/OverdueManagement";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
    return (
        <Router>

            <Routes>

                <Route path="/" element={<SignIn />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />


                <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<DashboardHome />} />
                    <Route path="readers" element={<ReaderManagement />} />
                    <Route path="books" element={<BookManagement />} />
                    <Route path="lending" element={<LendingManagement />} />
                    <Route path="overdue" element={<OverdueManagement />} />
                </Route>

            </Routes>
        </Router>
    );
}
