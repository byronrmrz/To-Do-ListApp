import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient'; // Importamos el degradado
import { useTasks } from '../context/TaskContext';
import { RootStackParamList } from '../types';
import SummaryCard from '../components/SummaryCard';

// Importamos la imagen local (Asegúrate que el nombre coincida)
const heroImage = require('../../assets/images/hero.png');

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { tasks } = useTasks();

  const pendingTasks = tasks.filter(t => !t.isCompleted).length;
  const completedTasks = tasks.filter(t => t.isCompleted).length;

  return (
    <View style={styles.container}>
      {/* Fondo con Degradado Suave */}
      <LinearGradient
        // Colores: De un morado oscuro azulado a un azul claro vibrante
        colors={['#4c669f', '#3b5998', '#192f6a']} 
        style={styles.background}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Sección Hero (Imagen + Saludo) */}
        <View style={styles.heroSection}>
          <Image 
            source={heroImage} 
            style={styles.heroImage} 
            resizeMode="contain" 
          />
          <Text style={styles.greeting}>¡Hola, Propietario!</Text>
          <Text style={styles.subtitle}>
            Tienes <Text style={{fontWeight: 'bold', color: '#FFD700'}}>{pendingTasks}</Text> tareas pendientes hoy.
          </Text>
        </View>

        {/* Panel de Resumen (Tarjetas flotantes) */}
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Tu Progreso</Text>
          <View style={styles.cardsRow}>
            <SummaryCard 
              title="Por hacer" 
              count={pendingTasks} 
              color="#FF9500" 
            />
            <SummaryCard 
              title="Hecho" 
              count={completedTasks} 
              color="#34C759" 
            />
          </View>
        </View>

        {/* Botones de Acción Modernos */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => navigation.navigate('AddTask')}
          >
            <LinearGradient
              colors={['#4facfe', '#00f2fe']} // Degradado Cyan
              start={{x: 0, y: 0}} end={{x: 1, y: 0}}
              style={styles.mainButton}
            >
              <Text style={styles.mainButtonText}>+ Nueva Tarea</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            activeOpacity={0.8}
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('TaskList')}
          >
            <Text style={styles.secondaryButtonText}>Ver Mi Lista Completa</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroSection: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  heroImage: {
    width: 200,   // Ajusta esto según tu imagen
    height: 200,  // Ajusta esto según tu imagen
    marginBottom: 10,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E0E0',
    marginTop: 5,
  },
  summarySection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginBottom: 15,
    marginLeft: 5,
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuSection: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  mainButton: {
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  mainButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  secondaryButton: {
    marginTop: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparente
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  secondaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});