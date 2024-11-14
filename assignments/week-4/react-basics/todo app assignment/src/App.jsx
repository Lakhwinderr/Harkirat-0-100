import { useState, memo, useCallback } from 'react'

let globalId = 1;
function App() {
  const [todos, setTodos] = useState([
    { id: 0,
      title: "Create App",
      description :"random text",
      completed: false
    }
  ])


const addTodo = useCallback((todo) => {
  setTodos([...todos, todo])
},[])
  const displayTodos = todos.map(todo => {
    return <div key={todo.id}>
      <h3>{todo.title}</h3>
      <h4>{todo.description}</h4>
      <button onClick={() => {
        const id = todo.id
          const newTodos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
          setTodos(newTodos)
      }}>{todo.completed ? "Done" : "Mark as Done"}</button>
    </div>})
  return <div>
      <CreateTodo addTodo = {addTodo}/>
     {displayTodos}
  </div>
}

const  CreateTodo  = memo(function({addTodo}){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
     return <div>
     <input type="text" placeholder='title' onChange={(e) => {
      setTitle(e.target.value)
     }}/><br/>                                                                                                                           
     <input type="text" placeholder='description' onChange={(e) => {
      setDescription(e.target.description)
     }} /><br/>
     <button onClick={() => {
        addTodo({
          id: globalId++,
          title: title,
          description: description
        })
     }}>Add todo</button> 
     </div>                                                                                                                                
})


export default App
