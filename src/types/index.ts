
export type TaskCategory = 'Trabajo' | 'Casa' | 'Negocios';

export interface Task {
  id: string;          
  title: string;       
  description: string;  
  category: TaskCategory; 
  isCompleted: boolean; 
  createdAt: number;   
}

export interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, description: string, category: TaskCategory) => void;
  toggleTaskStatus: (id: string) => void;
  deleteTask: (id: string) => void;
  getTaskById: (id: string) => Task | undefined;
}
export type RootStackParamList = {
  Home: undefined;
  AddTask: undefined;
  TaskList: undefined;
  TaskDetail: { taskId: string };
};