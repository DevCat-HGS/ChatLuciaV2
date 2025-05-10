import React, { useState } from 'react';
import { Calendar, FileSpreadsheet, BookOpen, Clock, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale/es';
import { utils, writeFile } from 'xlsx';

interface Task {
  id: string;
  title: string;
  type: 'guide' | 'activity' | 'event';
  dueDate: Date;
  status: 'pending' | 'in-progress' | 'completed';
  description: string;
}

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Guía de Programación Básica',
      type: 'guide',
      dueDate: new Date(2024, 2, 30),
      status: 'in-progress',
      description: 'Fundamentos de programación para principiantes'
    },
    {
      id: '2',
      title: 'Taller de Desarrollo Web',
      type: 'activity',
      dueDate: new Date(2024, 3, 15),
      status: 'pending',
      description: 'Práctica de HTML, CSS y JavaScript'
    },
    {
      id: '3',
      title: 'Feria de Proyectos',
      type: 'event',
      dueDate: new Date(2024, 4, 1),
      status: 'pending',
      description: 'Presentación de proyectos finales'
    }
  ]);

  const exportToExcel = () => {
    const worksheet = utils.json_to_sheet(
      tasks.map(task => ({
        Título: task.title,
        Tipo: task.type === 'guide' ? 'Guía' : task.type === 'activity' ? 'Actividad' : 'Evento',
        'Fecha Límite': format(task.dueDate, 'PPP', { locale: es }),
        Estado: task.status === 'pending' ? 'Pendiente' : 
               task.status === 'in-progress' ? 'En Progreso' : 'Completado',
        Descripción: task.description
      }))
    );

    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Actividades SENA');
    writeFile(workbook, 'actividades-sena.xlsx');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'guide': return <BookOpen className="w-5 h-5 text-green-600" />;
      case 'activity': return <Clock className="w-5 h-5 text-blue-600" />;
      case 'event': return <Calendar className="w-5 h-5 text-purple-600" />;
      default: return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Plataforma Educativa SENA
          </h1>
          <p className="text-gray-600 mt-2">
            Gestión de guías, actividades y eventos
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <FileSpreadsheet className="w-5 h-5" />
            Exportar a Excel
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
            <Plus className="w-5 h-5" />
            Nueva Tarea
          </button>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map(task => (
          <div
            key={task.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {getTypeIcon(task.type)}
                <h3 className="font-semibold text-gray-800">{task.title}</h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
                {task.status === 'pending' ? 'Pendiente' : 
                 task.status === 'in-progress' ? 'En Progreso' : 'Completado'}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{task.description}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Fecha límite:</span>
              <span>{format(task.dueDate, 'PPP', { locale: es })}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;