import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { environment } from '../../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = 'https://api.themoviedb.org/3/movie/popular';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
  return this.http
    .get<any>(`${this.apiUrl}?api_key=${environment.movieApiKey}&language=es-ES`)
    .pipe(
      map(response =>
        response.results.map((movie: any) => ({
          title: movie.title,
          releaseDate: movie.release_date,
          rating: movie.vote_average,
          overview: movie.overview,
          poster: movie.poster_path
            ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
            : '',
          backdrop: movie.backdrop_path
            ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            : ''
        }))
      )
    );
}
}
