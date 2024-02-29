import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/views/movies/movies-service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {
  editMovieForm!: FormGroup;
  movieDetails: any;
  movieId: any;
  categoryList: any[] = []; 

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.movieId = params['movieId'];
      if (this.movieId) {
        this.fetchMovieDetails();
      }
    });

    this.editMovieForm = new FormGroup({
      title: new FormControl('', Validators.required),
      image: new FormControl(''),
      movieId: new FormControl('', Validators.required)
    });
  }

  fetchMovieDetails() {
    this.movieService.getMovieById(this.movieId).then((result: any) => {
      this.movieDetails = result;
      this.fillInputs();
    }).catch((error: any) => {
      console.error('Error fetching movie details:', error);
    });
  }

  fillInputs() {
    if (this.movieDetails && this.editMovieForm) { 
      this.editMovieForm.get('title')!.setValue(this.movieDetails.title); // 
      this.editMovieForm.get('movieId')!.setValue(this.movieDetails.movieId); // 
    }
  }
  

  onFileChange(event: any) {
  }

  onSubmit() {
    if (this.editMovieForm.valid && this.movieId) {
      try {
        let payload = {
          id: this.movieId,
          title: this.editMovieForm.value.title,
          image: this.editMovieForm.value.image,
          movieId: this.editMovieForm.value.movieId
        };
        this.movieService.updateMovie(payload, 0);
        this.editMovieForm.reset();
        window.alert('Movie edited. Click OK to see all movies.');
        this.router.navigateByUrl('/views/movies/all-movies');
      } catch (error: any) {
        console.error('Error editing movie:', error);
        window.alert('Failed to edit movie. Please try again.');
      }
    }
  }
}
