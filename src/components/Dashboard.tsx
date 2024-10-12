import React from 'react';
import { Project, Payment } from '../types';
import ProjectCard from './ProjectCard';

interface DashboardProps {
  projects: Project[];
  payments: Payment[];
  onUpdateProject: (project: Project) => void;
  onDeleteProject: (id: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ projects, payments, onUpdateProject, onDeleteProject }) => {
  const totalEarnings = payments.reduce((sum, payment) => sum + payment.amount, 0);

  const monthlyEarnings = payments.reduce((acc, payment) => {
    const month = new Date(payment.date).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + payment.amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(monthlyEarnings).map(([month, amount]) => ({ month, amount }));
  const maxEarning = Math.max(...chartData.map(data => data.amount));

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Earnings Overview</h3>
          <p className="text-3xl font-bold text-green-600">${totalEarnings.toLocaleString()}</p>
          <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2">Monthly Earnings</h4>
            <div className="flex items-end space-x-2 h-64">
              {chartData.map(({ month, amount }) => (
                <div key={month} className="flex flex-col items-center">
                  <div 
                    className="w-8 bg-blue-500 rounded-t"
                    style={{ height: `${(amount / maxEarning) * 100}%` }}
                  ></div>
                  <span className="text-xs mt-1">{month}</span>
                  <span className="text-xs">${amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Projects</h3>
          <div className="space-y-4">
            {projects.map(project => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onUpdate={onUpdateProject}
                onDelete={onDeleteProject}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;