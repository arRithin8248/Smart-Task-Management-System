import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { Plus, Search, Filter } from 'lucide-react';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterPriority, setFilterPriority] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();

    // Check auth
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
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const { data } = await axios.get('/api/tasks', config);
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks', error);
        }
    };

    useEffect(() => {
        let result = tasks;

        // Filter by Status
        if (filterStatus === 'pending') {
            result = result.filter(task => !task.isCompleted);
        } else if (filterStatus === 'completed') {
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
                task.description.toLowerCase().includes(query)
            );
        }

        setFilteredTasks(result);
    }, [tasks, filterStatus, filterPriority, searchQuery]);

    const handleAddTask = () => {
        setEditingTask(null);
        setIsFormOpen(true);
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setIsFormOpen(true);
    };

    const handleDeleteTask = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` }
                };
                await axios.delete(`/api/tasks/${id}`, config);
                fetchTasks(userInfo.token);
            } catch (error) {
                console.error('Error deleting task', error);
            }
        }
    };

    const handleToggleComplete = async (task) => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            };
            await axios.put(`/api/tasks/${task._id}`, { isCompleted: !task.isCompleted }, config);
            fetchTasks(userInfo.token);
        } catch (error) {
            console.error('Error updating task', error);
        }
    };

    const handleSaveTask = async (taskData) => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            };

            if (taskData._id) {
                await axios.put(`/api/tasks/${taskData._id}`, taskData, config);
            } else {
                await axios.post('/api/tasks', taskData, config);
            }

            setIsFormOpen(false);
            fetchTasks(userInfo.token);
        } catch (error) {
            console.error('Error saving task', error);
        }
    };

    return (
        <Layout>
            <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                    <select
                        className="border rounded-md px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>

                    <select
                        className="border rounded-md px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                    >
                        <option value="all">All Priorities</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>

                    <button
                        onClick={handleAddTask}
                        className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm whitespace-nowrap"
                    >
                        <Plus size={18} className="mr-1" />
                        New Task
                    </button>
                </div>
            </div>

            {filteredTasks.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-dashed">
                    <p className="text-gray-500">No tasks found. Create one to get started!</p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredTasks.map(task => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            onEdit={handleEditTask}
                            onDelete={handleDeleteTask}
                            onToggleComplete={handleToggleComplete}
                        />
                    ))}
                </div>
            )}

            {isFormOpen && (
                <TaskForm
                    taskToEdit={editingTask}
                    onClose={() => setIsFormOpen(false)}
                    onSave={handleSaveTask}
                />
            )}
        </Layout>
    );
};

export default Dashboard;
