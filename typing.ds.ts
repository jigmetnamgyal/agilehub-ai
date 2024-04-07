interface Board {
  columns: Map<TypedColumn, TypedColumn>;
}

type TypedColumn = "todo" | "inprogress" | "done";

interface Column {
  id: TypedColumn;
  todos: Todo[];
}

interface Todo {
  $id: string;
  $createdAt: string;
  title: string;
  status: string;
  image?: string;
}

interface Image {
  bucketId: string;
  fieldID: string;
}
