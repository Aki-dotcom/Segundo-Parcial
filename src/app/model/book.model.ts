export class MyBook {
  id: number;
  title: string;
  author: string;
  year: number;
  genre: string;
  pages: number;
  description: string;

  constructor(id: number, title: string, author: string, year: number, genre: string, pages: number, description: string) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.year = year;
    this.genre = genre;
    this.pages = pages;
    this.description = description;
  }
}

