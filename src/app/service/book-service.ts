import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MyBook } from '../model/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'https://6916189b465a9144626edfa3.mockapi.io/api/libreria/books';

  constructor(private http: HttpClient) {}
  
  getAll(): Observable<MyBook[]> {
    return this.http.get<MyBook[]>(this.apiUrl);
  }

  addObject(object:MyBook): Observable<MyBook> {
    return this.http.post<MyBook>(this.apiUrl, object)
  }

  putObject(object: MyBook): Observable<MyBook> {
  return this.http.put<MyBook>(`${this.apiUrl}/${object.id}`, object);
  }
  
  deleteObject(object: MyBook): Observable<MyBook>{
    return this.http.delete<MyBook>(`${this.apiUrl}/${object.id}`)
  }

  
}
