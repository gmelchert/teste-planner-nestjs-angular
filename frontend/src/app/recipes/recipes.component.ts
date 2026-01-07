import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { RecipesService, CategoriesService } from '../shared/services';
import { Category, Recipe } from '../shared/models';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  standalone: false,
})
export class RecipesComponent implements OnInit {
  recipes = signal<Recipe[]>([]);
  categories = signal<Category[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  form = new FormGroup({
    search: new FormControl(''),
    categoryId: new FormControl<number | null>(null),
  });

  constructor(
    private recipesService: RecipesService,
    private categoriesService: CategoriesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadRecipes();
  }

  loadCategories(): void {
    this.categoriesService.getAll({ limit: 50 }).subscribe({
      next: ({ data }) => this.categories.set(data.rows),
      error: () => this.error.set('Erro ao carregar categorias'),
    });
  }

  loadRecipes(): void {
    const search = this.form.get('search')?.value || '';
    const categoryId = this.form.get('categoryId')?.value || null;

    this.isLoading.set(true);

    this.recipesService.getAll({
      search: search ?? '',
      categoryId: categoryId ?? null
    })
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: ({ data }) => {
          this.recipes.set(data.rows);
          this.error.set(null);
        },
        error: () => {
          this.error.set('Erro ao carregar receitas');
          this.recipes.set([]);
        },
      });
  }

  submit(): void {
    this.loadRecipes();
  }

  navigate(path: string): void {
    this.router.navigate([path]);
  }
}
