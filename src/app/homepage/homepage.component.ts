import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../views/categories/categories-service';
import { MovieService } from '../views/movies/movies-service';
import { Router } from '@angular/router'; // Import Router
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  categoryList: any = [];
  movieList: any = [];

  constructor(
    private categoryService: CategoryService,
    private movieService: MovieService,
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchMovies();
  }

  fetchCategories() {
    this.categoryList = this.categoryService.getCategories();
  }

  fetchMovies() {
    this.movieList = this.movieService.getMovies();
    this.movieList.forEach((movie: any) => {
      if (movie.photoUrl && !movie.photoUrl.includes('data:image')) {
        const base64Data = this.getBase64FromLocalStorage(movie.photoUrl);
        if (base64Data) {
          movie.photoUrl = base64Data;
        }
      }
    });
  }

  getBase64FromLocalStorage(photoUrl: string): string | null {
    const key = btoa(photoUrl);
    return localStorage.getItem(key) || null;
  }
  goToMovies() {
    this.router.navigate(['/views/movies/all-movies']);
  }

  goToCategories() {
    this.router.navigate(['/views/categories/all-categories']);
  }

}
