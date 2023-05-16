export const newsAmDomainNormalizer = (link) =>
  link.includes("news.am") ? link : `https://news.am/${link}`;

export const urlPicker = ({ type, lang, year, month, day }) => {
  switch (type) {
    case "newsAm":
      return `https://news.am/${
        middleFormLanguages[lang]
      }/news/allregions/allthemes/${year}/${zeroAdder(month)}/${zeroAdder(
        day
      )}/`;
    case "armenPress":
      return `https://armenpress.am/${
        middleFormLanguages[lang]
      }/news/allthemes/${year}/${zeroAdder(month)}/${zeroAdder(day)}/`;
  }
};

export const zeroAdder = (number) => (number < 10 ? "0" + number : number);

export const middleFormLanguages = { en: "eng", hy: "arm", ru: "rus" };

const dateFormatter = new Intl.DateTimeFormat("en-us", {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

//! NewsAm
export const newsAmDateNormalizer = (date) =>
  dateFormatter.format(new Date(date.replaceAll("+04", "T")));

export const scrapNewsAm = (data) =>
  [...data.querySelectorAll("article.article-item")].map((article) => ({
    link: newsAmDomainNormalizer(
      article.querySelector("a").getAttribute("href")
    ),
    img: newsAmDomainNormalizer(
      article.querySelector("a img").getAttribute("src")
    ),
    title: article.querySelector(".title a").innerText,
    date: newsAmDateNormalizer(
      article.querySelector("time").getAttribute("datetime")
    ),
    description: article.querySelector(".text").innerText,
    source: "news.am",
  }));

// ! ArmenPress Data
export const armenPressDateNormalizer = (date) =>
  dateFormatter.format(new Date(date));

export const scrapArmenPress = (data) =>
  [...data.querySelectorAll("article.newsbycatitem")].map((article) => ({
    link: article.querySelector("a").getAttribute("href"),
    img: article.querySelector("a img").getAttribute("src"),
    title: article.querySelector("p.newsbycattitle > a").innerText,
    date: armenPressDateNormalizer(
      article
        .querySelector("div > a > span[itemprop='datePublished']")
        .getAttribute("content")
    ),
    description: article.querySelector("p.newsbycattitle > a").innerText,
    source: "armenpress.am",
  }));
