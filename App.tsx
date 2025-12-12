import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TaskProvider } from './src/context/TaskContext';
import { RootStackParamList } from './src/types';

// Importamos las pantallas
import HomeScreen from './src/screens/HomeScreen';
import AddTaskScreen from './src/screens/AddTaskScreen';
import TaskListScreen from './src/screens/TaskListScreen';
import TaskDetailScreen from './src/screens/TaskDetailScreen';

// Creamos el Stack Navigator con nuestros tipos
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    // 1. Envolvemos todo en el TaskProvider para tener acceso a la DB
    <TaskProvider>
      {/* 2. Contenedor de Navegación */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'Inicio - Resumen' }} 
          />
          
          <Stack.Screen 
            name="AddTask" 
            component={AddTaskScreen} 
            options={{ title: 'Nueva Tarea' }} 
          />
          
          <Stack.Screen 
            name="TaskList" 
            component={TaskListScreen} 
            options={{ title: 'Mis Tareas' }} 
          />
          
          <Stack.Screen 
            name="TaskDetail" 
            component={TaskDetailScreen} 
            options={{ title: 'Detalle de Tarea' }} 
          />

        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
}