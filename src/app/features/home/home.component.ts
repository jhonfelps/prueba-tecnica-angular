import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MovieService } from '../../core/services/movie.service';
import { Movie } from '../../core/models/movie';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  pagedMovies: Movie[] = [];

  heroMovies: Movie[] = [];
  currentSlide = 0;
  private intervalId: any;

  loading = false;
  pageSize = 8;
  pageIndex = 0;

  constructor(
    private movieService: MovieService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  loadMovies(): void {
    this.loading = true;

    this.movieService.getMovies().subscribe({
      next: movies => {
        this.movies = movies;
        this.filteredMovies = movies;
        this.heroMovies = movies.slice(0, 5);
        this.updatePagedMovies();
        this.startSlider();
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

  startSlider(): void {
    this.intervalId = setInterval(() => {
      this.currentSlide =
        (this.currentSlide + 1) % this.heroMovies.length;
    }, 5000);
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