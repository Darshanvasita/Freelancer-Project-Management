import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import ProjectForm from './components/ProjectForm';
import PaymentList from './components/PaymentList';
import { Project, Payment } from './types';

const initialProjects: Project[] = [
  { id: 1, name: 'Website Redesign', dueDate: '2024-04-15', status: 'active' },
  { id: 2, name: 'Mobile App Development', dueDate: '2024-05-30', status: 'active' },
  { id: 3, name: 'Logo Design', dueDate: '2024-03-10', status: 'completed' },
];

const initialPayments: Payment[] = [
  { id: 1, projectId: 1, amount: 2500, status: 'paid', date: '2024-03-01' },
  { id: 2, projectId: 2, amount: 5000, status: 'unpaid', date: '2024-04-15' },
  { id: 3, projectId: 3, amount: 1000, status: 'paid', date: '2024-02-28' },
];

function App() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [payments, setPayments] = useState<Payment[]>(initialPayments);

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: Date.now() };
    setProjects([...projects, newProject]);
  };

  const updateProject = (updatedProject: Project) => {
    setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  const deleteProject = (id: number) => {
    setProjects(projects.filter(p => p.id !== id));
    setPayments(payments.filter(p => p.projectId !== id));
  };

  const updatePayment = (updatedPayment: Payment) => {
    setPayments(payments.map(p => p.id === updatedPayment.id ? updatedPayment : p));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8"> 
          <span className="text-3xl font-bold text-gray-900"><img src="public/images/coordinator.png" alt=""  style={{width:"50px",height:"50px"}}/>Freelancer Project Management</span>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Dashboard 
            projects={projects} 
            payments={payments}
            onUpdateProject={updateProject}
            onDeleteProject={deleteProject}
          />
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Add New Project</h2>
            <ProjectForm onSubmit={addProject} />
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Payment Tracking</h2>
            <PaymentList payments={payments} onUpdatePayment={updatePayment} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;