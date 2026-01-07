import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Recipe, RecipeQueryParams, PaginatedResponse, ApiResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private readonly API_URL = 'http://localhost:3000/recipes'; // Ajuste para o seu backend

  constructor(
    private http: HttpClient
  ) { }

  getAll(params: RecipeQueryParams = {}): Observable<PaginatedResponse<Recipe>> {
    let httpParams = new HttpParams();
    if (params.search) httpParams = httpParams.set('search', params.search);
    if (params.categoryId != null) httpParams = httpParams.set('categoryId', params.categoryId.toString());

    return this.http.get<PaginatedResponse<Recipe>>(this.API_URL, { params: httpParams });
  }

  getById(id: number): Observable<ApiResponse<Recipe>> {
    return this.http.get<ApiResponse<Recipe>>(`${this.API_URL}/${id}`);
  }

  create(recipe: Partial<Recipe>): Observable<ApiResponse<Recipe>> {
    return this.http.post<ApiResponse<Recipe>>(this.API_URL, recipe);
  }

  update(id: number, recipe: Partial<Recipe>): Observable<ApiResponse<Recipe>> {
    return this.http.put<ApiResponse<Recipe>>(`${this.API_URL}/${id}`, recipe);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
