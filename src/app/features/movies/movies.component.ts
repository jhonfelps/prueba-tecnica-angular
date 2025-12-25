import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {
  MatPaginatorModule,
  PageEvent
} from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatSnackBar,
  MatSnackBarModule
} from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MovieService } from '../../core/services/movie.service';
import { Movie } from '../../core/models/movie';

@Component({
  standalone: true,
  selector: 'app-movies',
  imports: [
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  pagedMovies: Movie[] = [];

  loading = false;
  pageSize = 12; // 3 filas de 4 cards
  pageIndex = 0;

  constructor(
    private movieService: MovieService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.loading = true;

    this.movieService.getMovies().subscribe({
      next: movies => {
        this.movies = movies;
        this.filteredMovies = movies;
        this.updatePagedMovies();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackBar.open(
          'Error al cargar las películas',
          'Cerrar',
          { duration: 3000 }
        );
      }
    });
  }

  applyFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    this.filteredMovies = this.movies.filter(movie =>
      movie.title.toLowerCase().includes(value)
    );

    this.pageIndex = 0;
    this.updatePagedMovies();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedMovies();
  }

  private updatePagedMovies(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedMovies = this.filteredMovies.slice(start, end);
  }
}

