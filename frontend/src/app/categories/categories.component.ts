import { Component, OnInit } from '@angular/core';

import { CategoriesService } from '../shared/services';
import { Category } from '../shared/models';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  standalone: false,
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoading = true;
    this.error = null;

    this.categoriesService.getAll().subscribe({
      next: ({ data }) => (this.categories = data.rows),
      error: () => (this.error = 'Erro ao carregar categorias'),
      complete: () => (this.isLoading = false),
    });
  }
}
