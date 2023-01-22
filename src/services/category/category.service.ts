import { Injectable } from '@angular/core';
import { Category } from './category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categories: Category[] = [];
  constructor() {}

  setCategories(categories: any[]) {
    this.clearCategories();
    categories.forEach((category) => {
      this.categories.push(
        new Category(category.categoryId, category.categoryName)
      );
    });
  }

  getCategories() {
    return this.categories;
  }

  clearCategories() {
    this.categories = [];
  }
}
