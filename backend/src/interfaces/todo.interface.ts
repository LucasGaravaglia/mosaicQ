export interface ToDo {
  id: string;
  title: string;
  description: string;
  status: string;
}

export interface ToDoCreate {
  title: string;
  description: string;
}

export interface ToDoRepository {
  create(data: ToDoCreate): Promise<ToDo>;
}
