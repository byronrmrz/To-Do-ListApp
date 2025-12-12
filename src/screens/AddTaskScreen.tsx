import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTasks } from '../context/TaskContext';
import { TaskCategory } from '../types';

export default function AddTaskScreen() {
  const navigation = useNavigation();
  const { addTask } = useTasks();

  // Estados del formulario
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TaskCategory>('Trabajo'); // Valor por defecto

  const handleSave = () => {
    // 1. Validación simple
    if (title.trim() === '' || description.trim() === '') {
      Alert.alert('Campos incompletos', 'Por favor ingresa un título y una descripción.');
      return;
    }

    // 2. Guardar usando nuestro Contexto (Base de Datos)
    addTask(title, description, category);

    // 3. Regresar a la pantalla anterior
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.form}>
        <Text style={styles.label}>Título de la tarea</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Revisar correos"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Detalles de lo que hay que hacer..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Categoría</Text>
        <View style={styles.categoryContainer}>
          {(['Trabajo', 'Casa', 'Negocios'] as TaskCategory[]).map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryButton, 
                category === cat && styles.categoryButtonSelected // Estilo si está seleccionado
              ]}
              onPress={() => setCategory(cat)}
            >
              <Text style={[
                styles.categoryText, 
                category === cat && styles.categoryTextSelected
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Guardar Tarea</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  form: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F2F2F7',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top', // Para Android
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  categoryButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  categoryButtonSelected: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  categoryTextSelected: {
    color: 'white',
  },
  saveButton: {
    backgroundColor: '#34C759', // Verde iOS
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});