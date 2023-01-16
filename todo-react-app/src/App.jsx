import { useState, useEffect } from "react";

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth()+1;
  const day = date.getDate();

  return `${day}.${month}.${year}`;

}

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
        <form onSubmit={(e) => onSubmitHandle(e)} className="form_add">
          <h2>Добавить задачу:</h2>
          <input type="text"
            placeholder="Купить молоко..."
            onChange={(e) => onChangeHandle(e)}
            value={value}
            className="add_input_style"
          />
        </form>
      </div>
      <div className="all_todos">
        {
          todos.map((todo) => {
            return (
              <div className="one_todo">
                <h3>{todo.name}({formatDate(todo.date)})</h3>
                <div>
                  <button onClick={() => onCheckedToggle(todo.id)} className="buttons">
                    {todo.checked ? "Не выполнена" : "Выполнена"}
                  </button>
                  <button onClick={() => onDeleteTodoById(todo.id)} className="buttons">
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
