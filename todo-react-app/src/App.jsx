import { useState, useEffect } from "react"

const UseEffectComponent = () => {
  useEffect(()=>{
    console.log('Текстовый компонент для проверки удаления компонентов со страницы');
  },[]);
  return(
    <div>
      Текстовый компонент для проверки удаления компонентов со страницы
    </div>
  )
}

const App = () => {

  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  const [skills, setSkills] = useState(['Front-End', 'Back-End', 'CI/CD']);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [a, setA] = useState(0);

  useEffect(() => {
    console.log('произошел первый рендер');


  }, [count.from]);

  const onChangeFormHandle = (e) => {
    setForm((prevState) => {
      prevState = { ...prevState };

      prevState[e.target.name] = e.target.value;

      return prevState;
    });
  }


  const onChangeHandle = (e) => {
    setName(e.target.value);
    setCount(e.target.value.length);
  };

  const onSubmitAddSkill = (e) => {
    if (e.keyCode === 13) {
      setSkills((prevState) => {
        return [...prevState, e.target.value];
      });
      e.target.value = '';
    }
  }

  return (
    <div>
      <p>Вы нажали на меня {count} раз(а)</p>
      <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
      <button onClick={() => setCount(count + 5)}>+5</button>


      {count >=10? <h1>компонент больше не доступен</h1>:<UseEffectComponent/>}

      <br />

      <h1>Привет, {name}!</h1>
      <input type="text" onChange={(e) => onChangeHandle(e)} />

      <br />

      <input type="text" onKeyDown={(e) => onSubmitAddSkill(e)} />

      <ul>
        {
          skills.map((skill) => {
            return (
              <li>{skill}</li>
            );
          })
        }
        <br />

      </ul>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>email</label>
        <input type="email"
          name="email"
          onChange={(e) => onChangeFormHandle(e)}
          value={form.email} />

        <label>password</label>
        <input type="password"
          name="password"
          onChange={(e) => onChangeFormHandle(e)}
          value={form.password} />

        <button>Отправить форму</button>
      </form>
    </div>
  )

}

export default App
