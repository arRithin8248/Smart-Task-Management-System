import React from 'react';
import { Pencil, Trash2, Calendar, CheckCircle2, Circle, Flag, Tag } from 'lucide-react';
import { format } from 'date-fns';

const TaskCard = ({ task, onEdit, onDelete, onToggleComplete }) => {
    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'High': return 'priority-high';
            case 'Medium': return 'priority-medium';
            case 'Low': return 'priority-low';
            default: return 'priority-low';
        }
    };

    const getBadgeClass = (priority) => {
        switch (priority) {
            case 'High': return 'badge badge-high';
            case 'Medium': return 'badge badge-medium';
            case 'Low': return 'badge badge-low';
            default: return 'badge badge-low';
        }
    };

    const isOverdue = task.dueDate && !task.isCompleted && new Date(task.dueDate) < new Date();

    return (
        <div
            className={`cyber-card p-4 ${getPriorityClass(task.priority)} ${task.isCompleted ? 'task-completed' : ''
                }`}
        >
            <div className="flex justify-between items-start gap-3">
                {/* Checkbox + Content */}
                <div className="flex items-start gap-3 flex-1 min-w-0">
                    <button
                        onClick={() => onToggleComplete(task)}
                        className={`mt-0.5 p-0.5 rounded-full transition-all duration-300 flex-shrink-0 ${task.isCompleted
                                ? 'text-status-low'
                                : 'text-text-muted hover:text-neon-magenta'
                            }`}
                    >
                        {task.isCompleted ? (
                            <CheckCircle2 className="w-5 h-5" />
                        ) : (
                            <Circle className="w-5 h-5" />
                        )}
                    </button>

                    <div className="flex-1 min-w-0">
                        {/* Title */}
                        <h3 className={`font-medium text-base text-text-primary mb-1 ${task.isCompleted ? 'task-title' : ''
                            }`}>
                            {task.title}
                        </h3>

                        {/* Description */}
                        {task.description && (
                            <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                                {task.description}
                            </p>
                        )}

                        {/* Badges Row */}
                        <div className="flex flex-wrap items-center gap-2">
                            {/* Priority Badge */}
                            <span className={getBadgeClass(task.priority)}>
                                <Flag className="w-3 h-3 mr-1" />
                                {task.priority}
                            </span>

                            {/* Category Badge */}
                            {task.category && (
                                <span className="badge badge-category">
                                    <Tag className="w-3 h-3 mr-1" />
                                    {task.category}
                                </span>
                            )}

                            {/* Due Date */}
                            {task.dueDate && (
                                <span className={`flex items-center gap-1 text-xs font-medium ${isOverdue
                                        ? 'text-status-high'
                                        : 'text-text-muted'
                                    }`}>
                                    <Calendar className="w-3.5 h-3.5" />
                                    {format(new Date(task.dueDate), 'MMM d, yyyy')}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                        onClick={() => onEdit(task)}
                        className="p-2 rounded-lg text-text-muted hover:text-neon-magenta hover:bg-neon-purple/20 transition-all duration-300"
                        title="Edit task"
                    >
                        <Pencil className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(task._id)}
                        className="p-2 rounded-lg text-text-muted hover:text-status-high hover:bg-red-500/20 transition-all duration-300"
                        title="Delete task"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
