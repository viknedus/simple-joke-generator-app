import "./App.css";
import { useRef, useState, useEffect } from "react";

function App() {
  // custom hook
  function useRandomJoke(firstName, lastName) {
    const [joke, setJoke] = useState("");

    useEffect(() => {
      const fetchJoke = async () =>
        await fetch(
          `http://api.icndb.com/jokes/random?firstName=${firstName}&lastName=${lastName}`
        )
          .then((res) => res.json())
          .then((data) => {
            setJoke(data.value.joke);
          });

      fetchJoke();
    }, [firstName, lastName]);
    return joke;
  }

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);

  const [firstName, setFirstName] = useState("Elon");
  const [lastName, setLastName] = useState("Musk");

  const joke = useRandomJoke(firstName, lastName);

  const generateJoke = (e) => {
    e.preventDefault();
    setFirstName(firstNameRef.current.value);
    setLastName(lastNameRef.current.value);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>The Joke Generator</h1>
        <h2>{joke}</h2>
        <button onClick={() => window.location.reload(false)}>
          Click to generate new joke!
        </button>
        <p>
          Enter your name below to generate jokes with your name in it. <br />{" "}
          Default name is Elon Musk
        </p>
        <form>
          <input placeholder="first name" ref={firstNameRef} />
          <input placeholder="last name" ref={lastNameRef} />
          <button onClick={generateJoke}>
            Generate new Joke with your name in it
          </button>
        </form>
      </header>
    </div>
  );
}

export default App;
