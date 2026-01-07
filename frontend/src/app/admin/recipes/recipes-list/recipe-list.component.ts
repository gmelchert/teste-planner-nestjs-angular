import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RecipesService } from '../../../shared/services';
import { Recipe } from '../../../shared/models';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  standalone: false,
})
export class RecipeListComponent implements OnInit {
  recipes = signal<Recipe[] | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);

  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loadRecipes();
  }

  newRecipe(): void {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute })
  }

  loadRecipes(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.recipesService.getAll()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: ({ data }) => (this.recipes.set(data.rows)),
        error: () => (this.error.set('Erro ao carregar receitas')),
      });
  }

  edit(recipe: Recipe): void {
    this.router.navigate([recipe.id, 'edit'], { relativeTo: this.activatedRoute });
  }

  deleteRecipe(recipe: Recipe): void {
    if (!confirm(`Deseja realmente excluir "${recipe.title}"?`)) return;

    this.recipesService.delete(recipe.id).subscribe({
      next: () => this.loadRecipes(),
      error: () => alert('Erro ao excluir receita'),
    });
  }
}
