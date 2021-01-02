type TodoItem = {
  id: string;
  todo: string;
  done: boolean;
};

type AddTodo = {
  todo: string;
};

type TodoId = {
  id: string;
};

type Action =
  | { type: 'add'; data: AddTodo }
  | { type: 'delete'; data: TodoId }
  | { type: 'toggle_done'; data: TodoId };

export type { TodoItem, AddTodo, TodoId, Action };
