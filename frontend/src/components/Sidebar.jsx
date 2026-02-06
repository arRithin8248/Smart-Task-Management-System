import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    CheckSquare,
    Calendar,
    CalendarDays,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Zap
} from 'lucide-react';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard },
        { name: 'My Tasks', path: '/tasks', icon: CheckSquare },
        { name: 'Today', path: '/today', icon: Calendar },
        { name: 'Upcoming', path: '/upcoming', icon: CalendarDays },
        { name: 'Completed', path: '/completed', icon: CheckCircle2 },
    ];

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    return (
        <aside
            className={`fixed left-0 top-0 h-full bg-gradient-to-b from-cyber-card to-cyber-bg border-r border-neon-purple/20 transition-all duration-300 z-40 flex flex-col ${isCollapsed ? 'w-16' : 'w-64'
                }`}
        >
            {/* Logo */}
            <div className="h-16 flex items-center px-4 border-b border-neon-purple/20">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-neon-purple to-neon-magenta rounded-xl flex items-center justify-center shadow-neon">
                        <Zap className="w-5 h-5 text-white" />
                    </div>
                    {!isCollapsed && (
                        <span className="font-bold text-lg text-white text-glow">
                            SmartTask
                        </span>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 px-3 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 group ${active
                                    ? 'bg-neon-purple/20 text-neon-pink border border-neon-purple/40 shadow-neon'
                                    : 'text-text-secondary hover:bg-neon-purple/10 hover:text-text-primary'
                                }`}
                            title={isCollapsed ? item.name : undefined}
                        >
                            <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-neon-magenta' : 'text-text-muted group-hover:text-neon-purple'
                                }`} />
                            {!isCollapsed && (
                                <span className="font-medium text-sm">{item.name}</span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Collapse Toggle */}
            <div className="p-3 border-t border-neon-purple/20">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-text-secondary hover:bg-neon-purple/10 hover:text-text-primary transition-all duration-300"
                    title={isCollapsed ? 'Expand' : 'Collapse'}
                >
                    {isCollapsed ? (
                        <ChevronRight className="w-5 h-5" />
                    ) : (
                        <>
                            <ChevronLeft className="w-5 h-5" />
                            <span className="text-sm font-medium">Collapse</span>
                        </>
                    )}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
