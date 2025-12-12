import React from 'react';
import { View, FlatList, StyleSheet, Text, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTasks } from '../context/TaskContext';
import { RootStackParamList } from '../types';
import TaskItem from '../components/TaskItem';

const emptyImage = require('../../assets/images/empty-state.png');

export default function TaskListScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { tasks, toggleTaskStatus, deleteTask } = useTasks();

  const handleDelete = (id: string) => {
    Alert.alert(
      "Eliminar Tarea",
      "¿Estás seguro de que quieres eliminar esta tarea?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", style: "destructive", onPress: () => deleteTask(id) }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image 
            source={emptyImage} 
            style={styles.emptyImage} 
            resizeMode="contain" 
          />
          <Text style={styles.emptyTitle}>¡Todo limpio!</Text>
          <Text style={styles.emptyText}>No tienes tareas pendientes por ahora.</Text>
          <Text style={styles.emptySubText}>Disfruta tu tiempo libre o agrega algo nuevo.</Text>
        </View>
      ) : (
        // --- LISTA DE TAREAS ---
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem 
              task={item}
              onToggle={toggleTaskStatus}
              onDelete={handleDelete}
              onPress={(id) => navigation.navigate('TaskDetail', { taskId: id })}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  listContent: {
    padding: 20,
    paddingBottom: 40,
  },
  // Estilos del Estado Vacío
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    marginTop: -20,
  },
  emptyImage: {
    width: 250,   
    height: 250,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    textAlign: 'center',
  },
});