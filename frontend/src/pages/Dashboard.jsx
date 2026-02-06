import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { Plus, Search, Inbox, TrendingUp, Clock, CheckCircle } from 'lucide-react';

const Dashboard = ({ filter = 'dashboard', pageTitle = 'Dashboard' }) => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterPriority, setFilterPriority] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) {
            navigate('/login');
        } else {
            fetchTasks(JSON.parse(userInfo).token);
        }
    }, [navigate]);

    const fetchTasks = async (token) => {
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const { data } = await axios.get('/api/tasks', config);
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks', error);
        }
    };

    useEffect(() => {
        let result = tasks;

        // Apply page-level filter based on route
        if (filter === 'today') {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            result = result.filter(task => {
                if (!task.dueDate) return false;
                const dueDate = new Date(task.dueDate);
                return dueDate >= today && dueDate < tomorrow && !task.isCompleted;
            });
        } else if (filter === 'upcoming') {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            result = result.filter(task => {
                if (!task.dueDate) return false;
                const dueDate = new Date(task.dueDate);
                return dueDate >= today && !task.isCompleted;
            });
        } else if (filter === 'completed') {
            result = result.filter(task => task.isCompleted);
        } else if (filter === 'all') {
            // Show all tasks for "My Tasks"
            result = result;
        }

        // Apply additional filters (status dropdown)
        if (filterStatus === 'pending') {
            result = result.filter(task => !task.isCompleted);
        } else if (filterStatus === 'completed' && filter !== 'completed') {
            result = result.filter(task => task.isCompleted);
        }

        // Filter by Priority
        if (filterPriority !== 'all') {
            result = result.filter(task => task.priority === filterPriority);
        }

        // Search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(task =>
                task.title.toLowerCase().includes(query) ||
                (task.description && task.description.toLowerCase().includes(query))
            );
        }

        setFilteredTasks(result);
    }, [tasks, filter, filterStatus, filterPriority, searchQuery]);

    const handleAddTask = () => { setEditingTask(null); setIsFormOpen(true); };
    const handleEditTask = (task) => { setEditingTask(task); setIsFormOpen(true); };

    const handleDeleteTask = async (id) => {
        if (window.confirm('Delete this task?')) {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            await axios.delete(`/api/tasks/${id}`, { headers: { Authorization: `Bearer ${userInfo.token}` } });
            fetchTasks(userInfo.token);
        }
    };

    const handleToggleComplete = async (task) => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        await axios.put(`/api/tasks/${task._id}`, { isCompleted: !task.isCompleted }, { headers: { Authorization: `Bearer ${userInfo.token}` } });
        fetchTasks(userInfo.token);
    };

    const handleSaveTask = async (taskData) => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        if (taskData._id) await axios.put(`/api/tasks/${taskData._id}`, taskData, config);
        else await axios.post('/api/tasks', taskData, config);
        setIsFormOpen(false);
        fetchTasks(userInfo.token);
    };

    // Stats (always based on all tasks)
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.isCompleted).length;
    const pendingTasks = totalTasks - completedTasks;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Show stats only on Dashboard
    const showStats = filter === 'dashboard';

    return (
        <Layout pageTitle={pageTitle}>
            {/* Stats Grid - Only on Dashboard */}
            {showStats && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="stats-card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-text-muted uppercase tracking-wider">Total Tasks</p>
                                <p className="text-2xl font-bold text-white mt-1">{totalTasks}</p>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-neon-purple/20 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-neon-purple" />
                            </div>
                        </div>
                    </div>
                    <div className="stats-card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-text-muted uppercase tracking-wider">Pending</p>
                                <p className="text-2xl font-bold text-status-medium mt-1">{pendingTasks}</p>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                                <Clock className="w-5 h-5 text-status-medium" />
                            </div>
                        </div>
                    </div>
                    <div className="stats-card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-text-muted uppercase tracking-wider">Completed</p>
                                <p className="text-2xl font-bold text-status-low mt-1">{completedTasks}</p>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-status-low" />
                            </div>
                        </div>
                    </div>
                    <div className="stats-card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-text-muted uppercase tracking-wider">Progress</p>
                                <p className="text-2xl font-bold text-neon-magenta mt-1">{completionRate}%</p>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-neon-magenta/20 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-neon-magenta" />
                            </div>
                        </div>
                        <div className="mt-3 progress-bar h-1.5">
                            <div className="progress-bar-fill" style={{ width: `${completionRate}%` }}></div>
                        </div>
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className="cyber-card p-4 mb-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input
                            type="text"
                            className="input-cyber pl-10"
                            placeholder="Search tasks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                        {filter !== 'completed' && (
                            <select className="input-cyber" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </select>
                        )}
                        <select className="input-cyber" value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
                            <option value="all">All Priorities</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                        <button onClick={handleAddTask} className="btn-neon flex items-center gap-2 whitespace-nowrap">
                            <Plus className="w-4 h-4" />
                            <span className="hidden sm:inline">New Task</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Tasks */}
            {filteredTasks.length === 0 ? (
                <div className="cyber-card p-12 text-center">
                    <div className="w-16 h-16 bg-neon-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Inbox className="w-8 h-8 text-neon-purple" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">No tasks found</h3>
                    <p className="text-sm text-text-secondary mb-4">
                        {filter === 'today' && "No tasks due today!"}
                        {filter === 'upcoming' && "No upcoming tasks!"}
                        {filter === 'completed' && "No completed tasks yet."}
                        {filter === 'all' && "You have no tasks."}
                        {filter === 'dashboard' && (tasks.length === 0 ? "Create your first task!" : "No tasks match your filters.")}
                    </p>
                    {tasks.length === 0 && (
                        <button onClick={handleAddTask} className="btn-neon">
                            <Plus className="w-4 h-4 inline mr-2" />Create Task
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredTasks.map(task => (
                        <TaskCard key={task._id} task={task} onEdit={handleEditTask} onDelete={handleDeleteTask} onToggleComplete={handleToggleComplete} />
                    ))}
                </div>
            )}

            {isFormOpen && <TaskForm taskToEdit={editingTask} onClose={() => setIsFormOpen(false)} onSave={handleSaveTask} />}
        </Layout>
    );
};

export default Dashboard;
