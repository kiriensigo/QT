import { useEffect, useState } from "react";
import { ArticleCard } from "./ArticleCard";
import "./App.css";

type QiitaItem = {
  id: string;
  title: string;
  url: string;
  rendered_body: string;
  created_at: string;
  user: {
    id: string;
    profile_image_url: string;
  };
};

function App() {
  const [items, setItems] = useState<QiitaItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const perPage = 10;

  useEffect(() => {
    const qiitaAccessToken = import.meta.env.VITE_QIITA_ACCESS_TOKEN;

    const fetchItems = async () => {
      setLoading(true);
      try {
        const headers: Record<string, string> = {};
        if (qiitaAccessToken) {
          headers["Authorization"] = `Bearer ${qiitaAccessToken}`;
        }
        console.log("アクセストークン:", qiitaAccessToken);
        console.log("ヘッダー:", headers);

        const response = await fetch(
          `https://qiita.com/api/v2/items?page=${page}&per_page=${perPage}`,
          {
            headers: {
              Authorization: `Bearer ${qiitaAccessToken}`,
            },
          }
        );
        console.log("レスポンスステータス:", response.status);
        const data = await response.json();
        console.log("取得したデータ:", data);
        console.log(
          "Total-Count ヘッダー:",
          response.headers.get("Total-Count")
        );
        console.log("Link ヘッダー:", response.headers.get("Link"));

        if (Array.isArray(data)) {
          setItems((prev) => [...prev, ...data]);
        }
        if (data.length < perPage) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("エラー", error);
      }
    };
    fetchItems();
  }, [page]);

  return (
    <>
      <div className="item-list">
        <div className="header">Qiita 記事一覧</div>
        {items.map((item, index) => (
          <ArticleCard key={item.id + index} item={item} />
        ))}
      </div>

      <div className="footer-nav">
        {!loading && hasMore && (
          <button className="more-button" onClick={() => setPage(page + 1)}>
            もっと読む
          </button>
        )}

        {loading && <p>読み込み中...</p>}

        {!hasMore && <p>これ以上記事はありません。</p>}
      </div>
    </>
  );
}

export default App;
