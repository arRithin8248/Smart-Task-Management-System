import React, { useState, useEffect } from 'react';
import { X, Calendar, Flag, Tag, FileText } from 'lucide-react';

const TaskForm = ({ taskToEdit, onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [category, setCategory] = useState('General');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description || '');
            setPriority(taskToEdit.priority || 'Medium');
            setCategory(taskToEdit.category || 'General');
            setDueDate(taskToEdit.dueDate ? taskToEdit.dueDate.substring(0, 10) : '');
        }
    }, [taskToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            title,
            description,
            priority,
            category,
            dueDate,
            _id: taskToEdit ? taskToEdit._id : null
        });
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="cyber-card w-full max-w-md overflow-hidden border-neon-purple/40 shadow-neon-lg">
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-neon-purple/30 bg-gradient-to-r from-neon-purple/10 to-transparent">
                    <h2 className="text-lg font-bold text-white text-glow">
                        {taskToEdit ? 'Edit Task' : 'Create New Task'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-neon-purple/20 transition-all"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="input-cyber"
                            placeholder="What needs to be done?"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-text-primary mb-2">
                            <FileText className="w-4 h-4 text-neon-purple" />
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="input-cyber resize-none"
                            placeholder="Add details about this task..."
                            rows="3"
                        />
                    </div>

                    {/* Priority & Category Row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-text-primary mb-2">
                                <Flag className="w-4 h-4 text-neon-purple" />
                                Priority
                            </label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="input-cyber"
                            >
                                <option value="Low">🟢 Low</option>
                                <option value="Medium">🟡 Medium</option>
                                <option value="High">🔴 High</option>
                            </select>
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-text-primary mb-2">
                                <Tag className="w-4 h-4 text-neon-purple" />
                                Category
                            </label>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="input-cyber"
                                placeholder="Work, Personal..."
                            />
                        </div>
                    </div>

                    {/* Due Date */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-text-primary mb-2">
                            <Calendar className="w-4 h-4 text-neon-purple" />
                            Due Date
                        </label>
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="input-cyber"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn-secondary"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-neon"
                        >
                            {taskToEdit ? 'Save Changes' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;
