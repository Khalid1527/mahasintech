import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function MahasinTech() {
  const [language, setLanguage] = useState("en");
  const [articles, setArticles] = useState([]);

  const content = {
    en: {
      title: "Welcome to MahasinTech",
      description:
        "Your daily source for the latest in tech companies and artificial intelligence.",
    },
    ar: {
      title: "مرحبًا بكم في محاسن تك",
      description: "مصدرُك اليومي لأحدث أخبار الشركات التقنية والذكاء الاصطناعي.",
    },
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://www.theverge.com/rss/index.xml");
        const data = await res.json();
        setArticles(data.items.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex justify-end mb-4">
        <Button onClick={() => setLanguage("en")} className="mx-2">
          English
        </Button>
        <Button onClick={() => setLanguage("ar")} className="mx-2">
          العربية
        </Button>
      </div>

      <Card className="max-w-xl mx-auto shadow-2xl rounded-2xl p-6 text-center">
        <CardContent>
          <h1 className="text-3xl font-bold mb-4">
            {content[language].title}
          </h1>
          <p className="text-lg mb-6">{content[language].description}</p>

          <div className="text-left">
            {articles.map((article, index) => (
              <div key={index} className="mb-4 border-b pb-2">
                <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold">
                  {article.title}
                </a>
                <p className="text-sm text-gray-600">{new Date(article.pubDate).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}