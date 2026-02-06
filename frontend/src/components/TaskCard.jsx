import React from 'react';
import { Pencil, Trash2, Calendar, Clock, CheckCircle, Circle } from 'lucide-react';
import { format } from 'date-fns';

const TaskCard = ({ task, onEdit, onDelete, onToggleComplete }) => {
    const priorityColors = {
        High: 'bg-red-100 text-red-800',
        Medium: 'bg-yellow-100 text-yellow-800',
        Low: 'bg-green-100 text-green-800',
    };

    return (
        <div className={`bg-white rounded-lg shadow-sm border p-4 transition duration-200 hover:shadow-md ${task.isCompleted ? 'opacity-75' : ''}`}>
            <div className="flex justify-between items-start">
                <div className="flex items-start space-x-3">
                    <button
                        onClick={() => onToggleComplete(task)}
                        className={`mt-1 focus:outline-none ${task.isCompleted ? 'text-green-500' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        {task.isCompleted ? <CheckCircle size={20} /> : <Circle size={20} />}
                    </button>
                    <div>
                        <h3 className={`font-semibold text-lg text-gray-800 ${task.isCompleted ? 'line-through text-gray-500' : ''}`}>
                            {task.title}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1 mb-2">{task.description}</p>

                        <div className="flex flex-wrap gap-2 text-xs">
                            <span className={`px-2 py-1 rounded-full font-medium ${priorityColors[task.priority] || 'bg-gray-100 text-gray-800'}`}>
                                {task.priority}
                            </span>
                            <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-700 font-medium border border-blue-100">
                                {task.category}
                            </span>
                        </div>

                        {(task.dueDate) && (
                            <div className="flex items-center text-gray-500 text-xs mt-3">
                                <Calendar size={14} className="mr-1" />
                                <span className="mr-3">{format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex space-x-1">
                    <button
                        onClick={() => onEdit(task)}
                        className="p-1.5 text-gray-400 hover:text-indigo-600 rounded-full hover:bg-gray-100 transition"
                    >
                        <Pencil size={16} />
                    </button>
                    <button
                        onClick={() => onDelete(task._id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-100 transition"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
