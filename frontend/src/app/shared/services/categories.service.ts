import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiResponse, Category, PaginatedResponse, SearchCategoriesQuery } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly API_URL = 'http://localhost:3000/categories';

  constructor(private http: HttpClient) { }

  getAll(query?: SearchCategoriesQuery): Observable<PaginatedResponse<Category>> {
    const queryParams = new URLSearchParams(query as Record<string, string>).toString();
    return this.http.get<PaginatedResponse<Category>>(`${this.API_URL}?${queryParams}`);
  }

  getById(id: number): Observable<ApiResponse<Category>> {
    return this.http.get<ApiResponse<Category>>(`${this.API_URL}/${id}`);
  }

  create(category: Partial<Category>): Observable<ApiResponse<Category>> {
    return this.http.post<ApiResponse<Category>>(this.API_URL, category);
  }

  update(id: number, category: Partial<Category>): Observable<ApiResponse<Category>> {
    return this.http.put<ApiResponse<Category>>(`${this.API_URL}/${id}`, category);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
