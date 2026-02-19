import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage';
import CareerPage from './pages/CareerPage';
import BlogPostPage from './pages/BlogPostPage';
import AdminPage from './pages/AdminPage';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
    return (
        <Router>
            <ScrollToTop />
            <div className="min-h-screen bg-gray-50 font-sans">
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/career" element={<CareerPage />} />
                    <Route path="/blog/:id" element={<BlogPostPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App
