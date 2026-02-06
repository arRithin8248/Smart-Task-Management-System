import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { Search, Bell, User, LogOut, Sparkles } from 'lucide-react';

const Navbar = ({ pageTitle = 'Dashboard' }) => {
    const navigate = useNavigate();
    const user = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    return (
        <nav className="h-16 bg-cyber-card/80 backdrop-blur-md border-b border-neon-purple/20 sticky top-0 z-30">
            <div className="h-full px-6 flex items-center justify-between">
                {/* Left: Page Title */}
                <h1 className="text-xl font-bold text-white text-glow flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-neon-magenta" />
                    {pageTitle}
                </h1>

                {/* Right: Search + Profile */}
                <div className="flex items-center gap-4">
                    {/* Search Bar */}
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            className="w-64 pl-10 pr-4 py-2 input-cyber"
                        />
                    </div>

                    {user ? (
                        <>
                            {/* Notifications */}
                            <button className="p-2 rounded-lg text-text-secondary hover:text-neon-magenta hover:bg-neon-purple/10 transition-all">
                                <Bell className="w-5 h-5" />
                            </button>

                            {/* Profile */}
                            <div className="flex items-center gap-3 pl-3 border-l border-neon-purple/30">
                                <div className="w-9 h-9 bg-gradient-to-br from-neon-purple to-neon-magenta rounded-full flex items-center justify-center shadow-neon">
                                    <User className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-sm font-medium text-text-primary hidden sm:block">
                                    {user.name}
                                </span>
                                <button
                                    onClick={logoutHandler}
                                    className="p-2 rounded-lg text-text-secondary hover:text-red-400 hover:bg-red-500/10 transition-all"
                                    title="Logout"
                                >
                                    <LogOut className="w-4 h-4" />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                to="/login"
                                className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-all"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="btn-neon text-sm"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
