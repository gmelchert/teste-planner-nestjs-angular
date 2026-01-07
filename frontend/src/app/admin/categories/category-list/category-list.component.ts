import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoriesService } from '../../../shared/services';
import { Category } from '../../../shared/models';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  standalone: false,
})
export class CategoryListComponent implements OnInit {
  categories = signal<Category[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.categoriesService.getAll({ limit: 50 })
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: ({ data }) => this.categories.set(data.rows),
        error: () => this.error.set('Erro ao carregar categorias'),
      });
  }

  edit(category: Category): void {
    this.router.navigate([category.id, 'edit'], { relativeTo: this.activatedRoute });
  }

  deleteCategory(category: Category): void {
    if (!confirm(`Deseja realmente excluir "${category.name}"?`)) return;
    this.categoriesService.delete(category.id).subscribe({
      next: () => this.loadCategories(),
      error: () => alert('Erro ao excluir categoria'),
    });
  }

  newCategory() {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute })
  }
}
