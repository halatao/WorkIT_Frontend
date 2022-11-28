import { Injectable } from '@angular/core';
import { Category } from './category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categories: Category[] = [];
  constructor() {}

  setCategories(categories: any[]) {
    categories.forEach((category) => {
      this.categories.push(new Category(category.id, category.name));
    });
  }

  getCategories() {
    return this.categories;
  }

  clearCategories() {
    this.categories = [];
  }
}
