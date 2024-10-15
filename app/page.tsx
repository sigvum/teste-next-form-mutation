import postgres from "postgres";

import { AddForm } from "@/app/add-form";
import { DeleteForm } from "@/app/delete-form";
import ButtonEdit from "@/components/custom/buttonEdit";

const sql = postgres(process.env.DATABASE_URL || process.env.POSTGRES_URL!, {
  ssl: "allow",
});

export default async function Home() {
  const todos = await sql`SELECT * FROM todos`;

  return (
    <main>
      <h1 className="sr-only">Todos</h1>
      <AddForm />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}{" "}
            <ButtonEdit
              Data={{
                id: `${todo.id}`,
                text: `${todo.text}`,
              }}
            />
            <DeleteForm id={todo.id} todo={todo.text} />
          </li>
        ))}
      </ul>
    </main>
  );
}
