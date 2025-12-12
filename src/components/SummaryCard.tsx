import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SummaryCardProps {
  title: string;
  count: number;
  color: string; // Color de fondo para diferenciar (ej. Naranja para pendientes)
}

export default function SummaryCard({ title, count, color }: SummaryCardProps) {
  return (
    <View style={[styles.card, { backgroundColor: color }]}>
      <Text style={styles.count}>{count}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 15,
    width: '45%', 
    alignItems: 'center',
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 20,
  },
  count: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
    fontWeight: '600',
  },
});