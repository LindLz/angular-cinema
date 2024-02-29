import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private localStorageKey = 'movies';
  private movies: any[] = [];

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

  addMovie(movie: any, categoryId: number,) {
    const movies = this.getMovies();
    const isDuplicate = movies.some(existingMovie =>
      existingMovie.title === movie.title && existingMovie.photoUrl === movie.photoUrl &&
      existingMovie.categoryId === categoryId
    );

    if (isDuplicate) {
      throw new Error('A movie with these details already exists.');
    }

    movie.id = new Date().getTime();
    movie.categoryId = categoryId;
    movies.push( movie);
    localStorage.setItem(this.localStorageKey, JSON.stringify(movies));
  }

  deleteMovie(movieId: number) {
    let movies = this.getMovies();
    movies = movies.filter(movie => movie.id !== movieId);
    localStorage.setItem(this.localStorageKey, JSON.stringify(movies));
  }

  getMovieById(MovieId: number, categoryList?: any[]): any {
    console.log('Requested Movie ID:', MovieId);

    const movies = this.getMovies();
    console.log('All Movies:', movies);

    const movie = movies.find(t => t.id === MovieId);
    console.log('Movie Found:', movie);

    if (!movie) {
      console.error(`Movie with ID ${MovieId} not found.`);
      return null;
    }

    if (categoryList) {
      console.log('Category List:', categoryList);

      const category = categoryList.find(u => u.id === movie.categoryId);
      console.log('Category Found:', category);

      if (category) {
        const MoviewithCategoryName = { ...movie, categoryName: category.categoryName };
        console.log('Movie with Category Name:', MoviewithCategoryName);
        return MoviewithCategoryName;
      } else {
        console.error(`Category with ID ${movie.categoryId} not found.`);
        return movie; 
      }
    }
  
    return movie;
}

  updateMovie(updatedMovie: any, categoryId: number) {
    let movies = this.getMovies();
    const index = movies.findIndex(movie => movie.id === updatedMovie.id);
    if (index !== -1) {
      movies[index] = updatedMovie;
      localStorage.setItem(this.localStorageKey, JSON.stringify(movies));
    }
  }


  getCategories(): Observable<string[]> {
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