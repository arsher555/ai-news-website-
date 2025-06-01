import { useEffect, useState } from "react";

const categories = [
  "top",
  "national",
  "world",
  "sports",
  "business",
  "technology",
  "science",
  "wars",
  "stock-market"
];
const languages = ["en", "hi"];

export default function Home() {
  const [news, setNews] = useState({});
  const [lang, setLang] = useState("en");

  useEffect(() => {
    categories.forEach(async (cat) => {
      const res = await fetch(`/api/news?category=${cat}&lang=${lang}`);
      const data = await res.json();
      setNews((prev) => ({ ...prev, [cat]: data.articles || [] }));
    });
  }, [lang]);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold">📰 AI News Website</h1>
      <div className="space-x-4">
        {languages.map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={\`px-4 py-2 rounded \${lang === l ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}\`}
          >
            {l === "en" ? "English" : "हिन्दी"}
          </button>
        ))}
      </div>
      {categories.map((cat) => (
        <div key={cat} className="mt-8">
          <h2 className="text-xl font-semibold mb-4">{cat.toUpperCase()}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(news[cat] || []).map((n, i) => (
              <div
                key={i}
                className="border rounded-xl p-4 shadow hover:shadow-md transition"
              >
                <h3 className="font-bold text-lg mb-2">{n.title}</h3>
                <p className="text-sm text-gray-700 mb-2">{n.description}</p>
                <a
                  href={n.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  और पढ़ें
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
