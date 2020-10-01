import { Author } from "./Author";

export interface Article {
  article: any;
  comments: any;
  title: string;
  description: string;
  text: string;
  author: {} | Author;
  date: string;
}

export interface State {
  article: {} | Article;
}

export interface ArticleList {
  articlesCount: number;
  articles: Article[];
  isLoading: boolean;
}
