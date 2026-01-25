import dayjs from "dayjs";

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

type Props = {
  item: QiitaItem;
};

export const ArticleCard = ({ item }: Props) => {
  const MAX_LENGTH = 100;

  const getSummary = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const text = doc.body.textContent || "";
    return text.replace(/\s+/g, " ").trim();
  };

  const summary = getSummary(item.rendered_body).slice(0, MAX_LENGTH) + "...";

  return (
    <article className="article-card">
      <header className="article-header">
        <a
          href={`https://qiita.com/${item.user.id}`}
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={item.user.profile_image_url}
            alt={item.user.id}
            className="article-user-image"
          />
        </a>
        <div className="user-info">
          <p className="user-id">{item.user.id}</p>
          <p className="post-date">
            {dayjs(item.created_at).format("YYYY年MM月DD日")}
          </p>
        </div>
      </header>
      <div className="article-user">{/* ユーザー情報 */}</div>
      <h2 className="article-title">
        <a href={item.url} target="_blank" rel="noreferrer">
          {item.title}
        </a>
      </h2>
      <p className="article-body">{summary}</p>
    </article>
  );
};
