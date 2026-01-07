import { Component, OnInit, signal } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoriesService } from '../../../shared/services';
import { Category } from '../../../shared/models';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss'],
  standalone: false,
})
export class CategoryEditComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  categoryId: number | null = null;
  isLoading = signal(false);
  isEdit = signal(false);

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit.set(true);
      this.categoryId = Number(idParam);
      this.loadCategory(this.categoryId);
    }
  }

  loadCategory(id: number): void {
    this.isLoading.set(true);
    this.categoriesService.getById(id)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: ({ data }) => this.form.patchValue({ name: data.name, description: data.description }),
        error: () => alert('Erro ao carregar categoria'),
      });
  }

  submit(): void {
    if (!this.form.valid) return;

    this.isLoading.set(true);
    const payload = this.form.value as Category;

    const request$ = this.isEdit()
      ? this.categoriesService.update(this.categoryId!, payload)
      : this.categoriesService.create(payload);

    request$
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: () => this.router.navigate(['/admin/categories']),
        error: () => alert('Erro ao salvar categoria'),
      });
  }
}
