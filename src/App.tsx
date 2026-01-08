import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    const qiitaAccessToken = import.meta.env.VITE_QIITA_ACCESS_TOKEN;

    fetch("https://qiita.com/api/v2/items", {
      headers: {
        Authorization: `Bearer ${qiitaAccessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card"></div>
    </>
  );
}

export default App;
