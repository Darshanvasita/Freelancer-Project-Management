import React, { useState } from 'react';
import { Project } from '../types';
import { Calendar, CheckCircle, Clock, Edit, Trash } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onUpdate: (project: Project) => void;
  onDelete: (id: number) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState(project);

  const handleSave = () => {
    onUpdate(editedProject);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-gray-50 p-4 rounded-md shadow-sm">
        <input
          className="w-full mb-2 p-1 border rounded"
          value={editedProject.name}
          onChange={(e) => setEditedProject({ ...editedProject, name: e.target.value })}
        />
        <input
          className="w-full mb-2 p-1 border rounded"
          type="date"
          value={editedProject.dueDate}
          onChange={(e) => setEditedProject({ ...editedProject, dueDate: e.target.value })}
        />
        <select
          className="w-full mb-2 p-1 border rounded"
          value={editedProject.status}
          onChange={(e) => setEditedProject({ ...editedProject, status: e.target.value as 'active' | 'completed' })}
        >
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <button onClick={handleSave} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Save</button>
        <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-2 py-1 rounded">Cancel</button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-4 rounded-md shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-lg font-semibold mb-2">{project.name}</h4>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Calendar size={16} className="mr-2" />
            <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-sm">
            {project.status === 'active' ? (
              <Clock size={16} className="mr-2 text-blue-500" />
            ) : (
              <CheckCircle size={16} className="mr-2 text-green-500" />
            )}
            <span className={project.status === 'active' ? 'text-blue-500' : 'text-green-500'}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </span>
          </div>
        </div>
        <div>
          <button onClick={() => setIsEditing(true)} className="text-blue-500 mr-2">
            <Edit size={16} />
          </button>
          <button onClick={() => onDelete(project.id)} className="text-red-500">
            <Trash size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;