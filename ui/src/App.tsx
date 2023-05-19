import React from "react";
import { useQuery, gql, useSubscription } from "@apollo/client";

import logo from "./logo.svg";
import "./App.css";

const TODOS_QUERY = gql`
  query getTodos {
    todoItems {
      id
      title
      description
    }
  }
`;

const NEW_TODO_SUBSCRIPTION = gql`
  subscription newTodoItem {
    newTodoItem {
      id
      title
      description
    }
  }
`;

function App() {
  const { data: todoItemsData, loading: isLoadingTodoItems } =
    useQuery(TODOS_QUERY);
  const { data: newTodoItemData, loading: isLoadingNewTodoItem } =
    useSubscription(NEW_TODO_SUBSCRIPTION);

  if (isLoadingTodoItems || isLoadingNewTodoItem) {
    return null;
  }

  const todos = todoItemsData?.todoItems;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          {todos.map((todo: any) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
