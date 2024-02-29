import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieService } from '../../movies-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit {
  createMovieForm: FormGroup;
  categories: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private movieService: MovieService,
    private router: Router
  ) {
    this.createMovieForm = this.formBuilder.group({
      title: ['', Validators.required],
      photoUrl: ['', Validators.required],
      category: ['', Validators.required] // Add category control
    });
  }

  ngOnInit() {
    this.movieService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = reader.result as string;
      localStorage.setItem('movieImage', imageData);
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.createMovieForm.valid) {
      try {
        const movieData = this.createMovieForm.value;
        movieData.photoUrl = localStorage.getItem('movieImage');
        this.movieService.addMovie(movieData);
        this.createMovieForm.reset();
        localStorage.removeItem('movieImage');
        window.alert('Movie created. Click OK to see all movies.');
        this.router.navigateByUrl('/movies/all-movies');
      } catch (error) {
        console.error('Error creating movie:', error);
        window.alert('Failed to create movie. Please try again.');
      }
    } else {
      window.alert('Form is not valid. Please check your input.');
    }
  }
}
