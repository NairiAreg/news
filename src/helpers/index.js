export const newsAmDomainNormalizer = (link) =>
  link.includes("news.am") ? link : `https://news.am/${link}`;

export const urlPicker = ({ type, lang, year, month, day, id }) => {
  switch (type) {
    case "newsAm":
      return `https://news.am/${
        middleFormLanguages[lang]
      }/news/allregions/allthemes/${year}/${zeroAdder(month)}/${zeroAdder(
        day
      )}/`;
    case "news.amSingle":
      return `https://news.am/${middleFormLanguages[lang]}/news/${id}.html`;
    case "armenPress":
      return `https://armenpress.am/${
        middleFormLanguages[lang]
      }/news/allthemes/${year}/${zeroAdder(month)}/${zeroAdder(day)}/`;
    case "armenpress.amSingle":
      return `https://armenpress.am/${middleFormLanguages[lang]}/news/${id}.html`;
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

const getIdFromUrl = (url) =>
  url
    .split("/")
    .filter((e) => e)
    .slice(-1)[0]
    .replace(".html", "");

//! NewsAm
export const newsAmDateNormalizer = (date) =>
  dateFormatter.format(new Date(date.replace("+04", "T")));

export const newsAmSingleDateNormalizer = (date) =>
  dateFormatter.format(new Date(date.replace("+04:00", "")));

export const scrapNewsAm = (data) =>
  [...data.querySelectorAll("article.article-item")].map((article) => ({
    id: getIdFromUrl(article.querySelector("a").getAttribute("href")),
    link: newsAmDomainNormalizer(
      article.querySelector("a").getAttribute("href").replace("//", "")
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

export const scrapSingleNewsAm = (data) => {
  // console.log("DATE: >>>>", data.querySelector(".article-info"));
  if (!data.querySelector(".article-info")) {
    return {};
  }
  return {
    img: newsAmDomainNormalizer(
      data.querySelector(".article-text > img").getAttribute("src")
    ),
    title: data.querySelector(".article-title").innerText,
    date: newsAmSingleDateNormalizer(
      data.querySelector(".time").getAttribute("content")
    ),
    description: data.querySelector(".article-body > p").innerText,
    source: "news.am",
  };
};

// ! ArmenPress Data
export const armenPressDateNormalizer = (date) =>
  dateFormatter.format(new Date(date));

export const scrapArmenPress = (data) =>
  [...data.querySelectorAll("article.newsbycatitem")].map((article) => ({
    id: getIdFromUrl(article.querySelector("a").getAttribute("href")),
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

export const scrapSingleArmenPressAm = (data) => {
  if (!data.querySelector("#opennewscontainer")) {
    return {};
  }
  return {
    img: data.querySelector("#opennewscontainer img").getAttribute("src"),
    title: data.querySelector("#opennewscontainer h1").innerText,
    date: armenPressDateNormalizer(
      data
        .querySelector("#opennewscontainer span.datetime")
        .getAttribute("content")
    ),
    description: data.querySelector(
      "#opennewscontainer span[itemprop='articleBody']"
    ).innerText,
    source: "armenpress.am",
  };
};
