import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../movies-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movieDetails:any
  movieId:any
  constructor(private movieService:MovieService, 
    private route:ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      this.movieId = params['movieId'];
    });
  }
  ngOnInit(): void {
    this.fetchMovieDetails()
  }
  fetchMovieDetails() {
    this.movieDetails = this.movieService.getMovieById(JSON.parse(this.movieId));   
  }

}
