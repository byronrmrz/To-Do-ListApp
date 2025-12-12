// src/context/TaskContext.tsx
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task, TaskCategory, TaskContextType } from '../types';

// Clave para guardar en la memoria del teléfono
const STORAGE_KEY = '@my_todo_app_v1';

// Creamos el contexto
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Componente Proveedor que envolverá nuestra App
export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // 1. CARGAR tareas al iniciar la App
  useEffect(() => {
    loadTasks();
  }, []);

  // 2. GUARDAR tareas cada vez que cambien
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (e) {
      console.error("Error al cargar tareas:", e);
    }
  };

  const saveTasks = async (currentTasks: Task[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(currentTasks));
    } catch (e) {
      console.error("Error al guardar tareas:", e);
    }
  };

  // Función: Agregar nueva tarea
  const addTask = (title: string, description: string, category: TaskCategory) => {
    const newTask: Task = {
      id: Date.now().toString(), // Usamos la fecha como ID único
      title,
      description,
      category,
      isCompleted: false,
      createdAt: Date.now(),
    };
    setTasks([newTask, ...tasks]); // Agregamos al inicio de la lista
  };

  // Función: Marcar como completada o pendiente
  const toggleTaskStatus = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    ));
  };

  // Función: Eliminar tarea
  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Función: Obtener una tarea específica
  const getTaskById = (id: string) => {
    return tasks.find(task => task.id === id);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTaskStatus, deleteTask, getTaskById }}>
      {children}
    </TaskContext.Provider>
  );
};

// Hook para usar el contexto fácilmente en las pantallas
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks debe ser usado dentro de un TaskProvider');
  }
  return context;
};