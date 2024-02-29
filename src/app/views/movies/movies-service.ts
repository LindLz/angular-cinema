import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private localStorageKey = 'movies';

  constructor() {
    this.initMovies();
  }

  initMovies() {
    if (!localStorage.getItem(this.localStorageKey)) {
      localStorage.setItem(this.localStorageKey, JSON.stringify([]));
    }
  }

  getMovies(): any[] {
    const movies = localStorage.getItem(this.localStorageKey);
    return movies ? JSON.parse(movies) : [];
  }

  addMovie(movie: any) {
    const movies = this.getMovies();
    const isDuplicate = movies.some(existingMovie =>
      existingMovie.title === movie.title && existingMovie.photoUrl === movie.photoUrl
    );

    if (isDuplicate) {
      throw new Error('A movie with these details already exists.');
    }

    movie.id = new Date().getTime();
    movies.push({ id: movie.id, title: movie.title });
    localStorage.setItem(this.localStorageKey, JSON.stringify(movies));
  }

  deleteMovie(movieId: number) {
    let movies = this.getMovies();
    movies = movies.filter(movie => movie.id !== movieId);
    localStorage.setItem(this.localStorageKey, JSON.stringify(movies));
  }

  getMovieById(movieId: number): any {
    const movies = this.getMovies();
    return movies.find(movie => movie.id === movieId);
  }

  updateMovie(updatedMovie: any) {
    let movies = this.getMovies();
    const index = movies.findIndex(movie => movie.id === updatedMovie.id);
    if (index !== -1) {
      movies[index] = updatedMovie;
      localStorage.setItem(this.localStorageKey, JSON.stringify(movies));
    }
  }

  // Method to fetch categories
  getCategories(): Observable<string[]> {
    // Assuming categories are stored in localStorage for now
    const movies = this.getMovies();
    const categories = new Set<string>();

    movies.forEach(movie => {
      if (movie.category) {
        categories.add(movie.category);
      }
    });

    return of(Array.from(categories));
  }
}
