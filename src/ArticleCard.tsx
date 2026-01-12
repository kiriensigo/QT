type Props = {
  item: any;
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
