import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children, pageTitle = 'Dashboard' }) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyber-bg via-cyber-bg-light to-cyber-bg">
            {/* Sidebar */}
            <Sidebar
                isCollapsed={sidebarCollapsed}
                setIsCollapsed={setSidebarCollapsed}
            />

            {/* Main Content Area */}
            <div
                className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'
                    }`}
            >
                {/* Top Navbar */}
                <Navbar pageTitle={pageTitle} />

                {/* Page Content */}
                <main className="p-6">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
