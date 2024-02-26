import { Component, OnInit } from '@angular/core';
import { CategoryService } from './categories/categories-service';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.css']
})
export class ViewsComponent implements OnInit {
  categoryList:any = []
  constructor(private categoryService:CategoryService) { }
  ngOnInit(): void {
    this.fetchCategories()
  }
  fetchCategories() {
    this.categoryList = this.categoryService.getCategories();
  }

}
