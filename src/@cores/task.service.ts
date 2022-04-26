import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TaskDTO} from "./dtos/TaskDTO";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private port = "8443"
  private url = `http://localhost:${this.port}/api/service/task`;

  constructor(
    private http: HttpClient
  ) { }

  save(mainPage: TaskDTO): Observable<TaskDTO> {
    return this.http.post<TaskDTO>(`${this.url}/`, mainPage);
  }

  getById(id: number): Observable<TaskDTO> {
    return this.http.get<TaskDTO>(`${this.url}/${id}`);
  }

  getAll(): Observable<TaskDTO[]> {
    return this.http.get<TaskDTO[]>(`${this.url}/all`);
  }

  update(mainPage: TaskDTO): Observable<TaskDTO> {
    return this.http.put<TaskDTO>(`${this.url}/update`, mainPage);
  }

  deleteById(id: number): Observable<TaskDTO> {
    return this.http.delete<TaskDTO>(`${this.url}/deleteById/${id}`);
  }

}
