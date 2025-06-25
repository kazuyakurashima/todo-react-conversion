import { useState } from 'react'
import { InputTodo } from './components/InputTodo';
import { IncompleteTodos } from './components/IncompleteTodos';
import { CompleteTodos } from './components/CompleteTodos';
import './styles.css'

export const Todo = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

const onChangeTodoText = (event) => setTodoText(event.target.value);

const onClickAdd = () => {
  if (todoText === "")return;
  const newTodos = [...incompleteTodos, todoText];
  setIncompleteTodos(newTodos);
  setTodoText("");
};

const onClickDelete = (index) => {
  const newTodos = [...incompleteTodos]
  newTodos.splice(index, 1);
  setIncompleteTodos(newTodos);
};

const onClickComplete = (index) => {
  const newTodos = [...incompleteTodos];
  newTodos.splice(index, 1);
  setIncompleteTodos(newTodos);
  const newCompleteTodos = [...completeTodos,incompleteTodos[index]];
  setCompleteTodos(newCompleteTodos);
};

  const onClickReturn =(index) => {
    const newTodos = [...completeTodos];
    newTodos.splice(index, 1);
    setCompleteTodos(newTodos);
    const newIncompleteTodos = [...incompleteTodos,completeTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
  };

  const isMaxLimitIncompleteTodos = incompleteTodos.length >=5;

  return (
  <>
  <InputTodo 
    todoText={todoText} 
    onChange={onChangeTodoText} 
    onClick={onClickAdd} 
    disabled={isMaxLimitIncompleteTodos}
  />
  {isMaxLimitIncompleteTodos && (
    <p style={{color: "red"}}>
      登録できるToDoは５個まで！まずは行動。そして習慣へ
    </p>
  )}
  <IncompleteTodos 
    incompleteTodos={incompleteTodos}
    onClickComplete={onClickComplete}
    onClickDelete={onClickDelete}
  />
  <CompleteTodos 
    completeTodos={completeTodos}
    onClickReturn={onClickReturn}
  />
  </>
  );
};
