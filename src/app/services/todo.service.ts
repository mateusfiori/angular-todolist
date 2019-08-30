import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '../models/Todo';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  
  constructor(private http: HttpClient) { }

  apiUrl:string = 'https://jsonplaceholder.typicode.com/todos';
  apiSuffix:string = '?_limit=5';

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}${this.apiSuffix}`);
  }

  toggleCompleted(todo: Todo): Observable<any> {
    const url = `${this.apiUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions)
  }

  deleteTodo(todo: Todo): Observable<Todo> {
    const url = `${this.apiUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo, httpOptions);
  }

}
