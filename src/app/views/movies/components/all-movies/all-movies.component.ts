import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../movies-service';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.css']
})
export class AllMoviesComponent implements OnInit {
  movieList: any = [];



  deleteMovieModal: boolean = false;
  clickedMovieData: any;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies() {
    try {
      this.movieList = this.movieService.getMovies();
    } catch (error) {
      console.error('Error fetching movies:', error);
      // Handle error appropriately (e.g., show error message)
    }
  }
  
  getBase64FromLocalStorage(photoUrl: string): string | null {
    const key = btoa(photoUrl); 
    return localStorage.getItem(key);
  }

  deleteMovie(item: any) {
    this.clickedMovieData = item;
    this.deleteMovieModal = true;
  }

  async deleteMovieFromTable(movieId: number) {
    try {
      // Perform deletion using the movieService
      await this.movieService.deleteMovie(movieId);
      this.fetchMovies(); // Refresh movieList after deletion
      window.alert('Movie deleted. Click OK to see all movies.');
      this.deleteMovieModal = false;
    } catch (error) {
      console.error('Error deleting movie:', error);
      // Handle error appropriately (e.g., show error message)
    }
  }

  closeDeleteMovieModal() {
    this.deleteMovieModal = false;
  }
}
