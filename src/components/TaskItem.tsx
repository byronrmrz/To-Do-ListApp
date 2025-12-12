import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onPress: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete, onPress }: TaskItemProps) {
  
  // Definir color según la categoría
  const getCategoryColor = (cat: string) => {
    switch(cat) {
      case 'Trabajo': return '#007AFF'; // Azul
      case 'Casa': return '#34C759';    // Verde
      case 'Negocios': return '#5856D6'; // Morado
      default: return '#8E8E93';
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => onPress(task.id)}
      activeOpacity={0.7}
    >
      {/* Botón Checkbox */}
      <TouchableOpacity 
        style={styles.checkButton} 
        onPress={() => onToggle(task.id)}
      >
        <Ionicons 
          name={task.isCompleted ? "checkbox" : "square-outline"} 
          size={24} 
          color={task.isCompleted ? "#34C759" : "#8E8E93"} 
        />
      </TouchableOpacity>

      {/* Información de la Tarea */}
      <View style={styles.textContainer}>
        <Text style={[
          styles.title, 
          task.isCompleted && styles.completedText // Tachar si está completa
        ]}>
          {task.title}
        </Text>
        <Text style={[styles.category, { color: getCategoryColor(task.category) }]}>
          {task.category}
        </Text>
      </View>

      {/* Botón Eliminar */}
      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={() => onDelete(task.id)}
      >
        <Ionicons name="trash-outline" size={22} color="#FF3B30" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
    // Sombra suave
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  checkButton: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#8E8E93',
  },
  category: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
  deleteButton: {
    padding: 8,
  },
});