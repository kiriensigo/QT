import { useEffect, useState } from "react";
import { ArticleCard } from "./ArticleCard";
import "./App.css";

function App() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const qiitaAccessToken = import.meta.env.VITE_QIITA_ACCESS_TOKEN;

    const fetchItems = async () => {
      try {
        const response = await fetch("https://qiita.com/api/v2/items", {
          headers: {
            Authorization: `Bearer ${qiitaAccessToken}`,
          },
        });
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("通信エラーが発生しました:", error);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="item-list">
      <div className="header">Qiita 記事一覧</div>
      {items.map((item) => (
        <ArticleCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default App;
