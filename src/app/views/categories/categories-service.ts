import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private localStorageKey = 'categories';

  constructor() {
    this.initCategories();
  }

  initCategories() {
    if (!localStorage.getItem(this.localStorageKey)) {
      localStorage.setItem(this.localStorageKey, JSON.stringify([]));
    }
  }

  getCategories(): any[] {
    const categories = localStorage.getItem(this.localStorageKey);
    return categories ? JSON.parse(categories) : [];
  }

  getCategoryById(taskId: number): any {
    const categories = this.getCategories();
    return categories.find(category => category.id === taskId);
  }

  addCategory(category: any) {
    const categories = this.getCategories();
    const isDuplicate = categories.some(existingCategory =>
      existingCategory.categoryTitle === category.categoryTitle  &&
      existingCategory.info === category.info  &&
      existingCategory.priority === category.priority
    );

    if (isDuplicate) {
      throw new Error('A category with these details already exists.');
    }
    category.id = new Date().getTime();
    categories.push(category);
    localStorage.setItem(this.localStorageKey, JSON.stringify(categories));
  }

  deleteCategory(taskId: number) {
    let categories = this.getCategories();
    categories = categories.filter(category => category.id !== taskId);
    localStorage.setItem(this.localStorageKey, JSON.stringify(categories));
  }

  updateCategory( updatedCategory: any) {
    let categories = this.getCategories();
    const index = categories.findIndex(category => category.id === updatedCategory.id);
    if (index !== -1) {
      categories[index] = { ...categories[index], ...updatedCategory };
      localStorage.setItem(this.localStorageKey, JSON.stringify(categories));
    }
  }


}
