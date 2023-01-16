import { useState, useEffect } from "react";


const App = () => {

  const [todos, setTodos] = useState([
    {
      id: 1,
      name: "Купить продукты",
      date: new Date(),
      checked: false
    },
    {
      id: 2,
      name: "Заправить автомобиль",
      date: new Date(),
      checked: false
    }
  ]);

  const [value, setValue] = useState('');

  const onChangeHandle = (event) => {
    setValue(event.target.value);
  }


  const onSubmitHandle = (event) => {
    event.preventDefault();

    // add todos
    setTodos((prevState) => {
      prevState = [...prevState];

      prevState.push({
        id: Date.now(),
        name: value,
        date: new Date(),
        checked: false
      });
      return prevState;
    });

    setValue('');
  }

  const onCheckedToggle = (id) => {
    setTodos((prevState) => {
      prevState = [...prevState];

      prevState = prevState.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            checked: !todo.checked
          }
        }
        return todo;
      });
      return prevState;
    });
  }

  const onDeleteTodoById = (id) => {
    setTodos((prevState) => {
      prevState = [...prevState];

      // .filter()
      prevState = prevState.filter((todo) => todo.id !== id);


      return prevState;

    });
  }

  return (
    <div className="layout">
      <div>
        <form onSubmit={(e) => onSubmitHandle(e)}>
          <h2>Добавить задачу:</h2>
          <input type="text"
            placeholder="Купить молоко..."
            onChange={(e) => onChangeHandle(e)}
            value={value}
          />
        </form>
      </div>
      <div>
        {
          todos.map((todo) => {
            return (
              <div>
                <h3>{todo.name}({todo.date.toString()})</h3>
                <div>
                  <button onClick={() => onCheckedToggle(todo.id)}>
                    {todo.checked ? "Не выполнена" : "Выполнена"}
                  </button>
                  <button onClick={() => onDeleteTodoById(todo.id)}>
                    Удалить
                  </button>
                </div>
              </div>
            )
          })
        }

      </div>
    </div>
  );

};

export default App;
