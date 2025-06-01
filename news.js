export default async function handler(req, res) {
  const { category = "top", lang = "en" } = req.query;

  const categoryMap = {
    top: "general",
    national: "general",
    world: "general",
    sports: "sports",
    business: "business",
    technology: "technology",
    science: "science",
    wars: "general",
    "stock-market": "business"
  };

  const url = `https://newsapi.org/v2/top-headlines?country=${
    lang === "hi" ? "in" : "us"
  }&category=${categoryMap[category]}&language=${lang}&pageSize=10&apiKey=6c93a5de3a7f400ca096aae4ba02250a`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch news" });
  }
}
