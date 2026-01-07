import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { RecipesService, CategoriesService } from '../../../shared/services';
import { Recipe, Category } from '../../../shared/models';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
  standalone: false,
})
export class RecipeEditComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    ingredients: new FormControl('', Validators.required),
    instructions: new FormControl('', Validators.required),
    preparationTime: new FormControl<number>(0, Validators.required),
    servings: new FormControl<number>(1, Validators.required),
    difficulty: new FormControl<'easy' | 'medium' | 'hard'>('medium', Validators.required),
    categoryId: new FormControl<number | null>(null, Validators.required),
  });

  categories = signal<Category[]>([]);
  isLoading = signal(false);
  isEdit = signal(false);
  recipeId: number | null = null;

  constructor(
    private recipesService: RecipesService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCategories();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit.set(true);
      this.recipeId = Number(idParam);
      this.loadRecipe(this.recipeId);
    }
  }

  loadCategories(): void {
    this.categoriesService.getAll({ limit: 50 }).subscribe(({ data }) => this.categories.set(data.rows));
  }

  loadRecipe(id: number): void {
    this.isLoading.set(true);
    this.recipesService.getById(id)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: ({ data }) => {
          this.form.patchValue({
            title: data.title,
            description: data.description,
            ingredients: (data.ingredients as string),
            instructions: (data.instructions as string),
            preparationTime: data.preparationTime,
            servings: data.servings,
            difficulty: data.difficulty,
            categoryId: data.categoryId,
          });
        },
        error: () => alert('Erro ao carregar receita'),
      });
  }

  submit(): void {
    if (!this.form.valid) return;

    this.isLoading.set(true);
    const payload = this.form.value as Recipe;

    const request$ = this.isEdit()
      ? this.recipesService.update(this.recipeId!, payload)
      : this.recipesService.create(payload);

    request$
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: () => this.router.navigate(['/admin/recipes']),
        error: () => alert('Erro ao salvar receita'),
      });
  }
}
