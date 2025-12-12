import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTasks } from '../context/TaskContext';
import { RootStackParamList, Task } from '../types';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'TaskDetail'>;

export default function TaskDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<DetailScreenRouteProp>();
  const { taskId } = route.params;
  const { getTaskById, toggleTaskStatus, deleteTask } = useTasks();

  const [task, setTask] = useState<Task | undefined>(undefined);

  // Cargar la tarea cuando se abre la pantalla o cambia el ID
  useEffect(() => {
    const foundTask = getTaskById(taskId);
    setTask(foundTask);
  }, [taskId, getTaskById]); // Dependencias para refrescar si cambia algo

  // Si la tarea no existe (ej. se borró), volvemos atrás
  if (!task) {
    return (
      <View style={styles.center}>
        <Text>Cargando o tarea no encontrada...</Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      "Eliminar Tarea",
      "¿Seguro que quieres eliminar esta tarea permanentemente?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          style: "destructive", 
          onPress: () => {
            deleteTask(task.id);
            navigation.goBack();
          } 
        }
      ]
    );
  };

  const handleToggle = () => {
    toggleTaskStatus(task.id);
    // Actualizamos el estado local para ver el cambio inmediatamente
    setTask({ ...task, isCompleted: !task.isCompleted }); 
  };

  const getCategoryColor = (cat: string) => {
    switch(cat) {
      case 'Trabajo': return '#007AFF';
      case 'Casa': return '#34C759';
      case 'Negocios': return '#5856D6';
      default: return '#8E8E93';
    }
  };

  return (
    <ScrollView style={styles.container}>
      
      {/* Encabezado con Estado y Categoría */}
      <View style={styles.header}>
        <View style={[styles.badge, { backgroundColor: getCategoryColor(task.category) }]}>
          <Text style={styles.badgeText}>{task.category}</Text>
        </View>
        <View style={[
            styles.statusBadge, 
            { backgroundColor: task.isCompleted ? '#E8F5E9' : '#FFF3E0' }
          ]}>
          <Text style={{ 
            color: task.isCompleted ? '#2E7D32' : '#EF6C00', 
            fontWeight: 'bold' 
          }}>
            {task.isCompleted ? "COMPLETADA" : "PENDIENTE"}
          </Text>
        </View>
      </View>

      {/* Título Grande */}
      <Text style={styles.title}>{task.title}</Text>

      {/* Descripción */}
      <View style={styles.descriptionBox}>
        <Text style={styles.label}>Descripción:</Text>
        <Text style={styles.description}>{task.description}</Text>
      </View>

      {/* Botones de Acción */}
      <View style={styles.actions}>
        
        {/* Botón Completar */}
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: task.isCompleted ? '#8E8E93' : '#34C759' }]}
          onPress={handleToggle}
        >
          <Ionicons 
            name={task.isCompleted ? "arrow-undo" : "checkmark-circle"} 
            size={24} 
            color="white" 
          />
          <Text style={styles.actionText}>
            {task.isCompleted ? "Marcar Pendiente" : "Completar Tarea"}
          </Text>
        </TouchableOpacity>

        {/* Botón Borrar */}
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: '#FF3B30', marginTop: 15 }]}
          onPress={handleDelete}
        >
          <Ionicons name="trash" size={24} color="white" />
          <Text style={styles.actionText}>Eliminar Tarea</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 25,
  },
  descriptionBox: {
    backgroundColor: '#F2F2F7',
    padding: 20,
    borderRadius: 15,
    minHeight: 150,
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 18,
    color: '#333',
    lineHeight: 26,
  },
  actions: {
    marginTop: 10,
    marginBottom: 40,
  },
  actionButton: {
    flexDirection: 'row',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  actionText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
});