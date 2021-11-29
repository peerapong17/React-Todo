export interface Todo {
  id: string;
  createdAt: string;
  isCompleted: boolean;
  task: string;
  userId: string;
}

// export interface UserData {
//   username: string
//   todos: Todo[];
// }

export interface StateTodos {
  isLoading: boolean;
  todoList: Todo[];
  error: string;
}
