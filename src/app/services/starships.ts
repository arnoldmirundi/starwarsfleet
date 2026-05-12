import { computed, inject, Injectable, signal } from '@angular/core';
import { Starship } from '../models/starship';
import { Api } from './api';

@Injectable({
  providedIn: 'root',
})

export class Starships {
  private api = inject(Api);

  starships = signal<Starship[]>([]);
  loading = signal(false);
  error = signal('');
  loadingMore = signal(true);
  searchTerm = signal('');

  filterStarships = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.starships().filter(ship => ship.name.toLowerCase().includes(term));
  });

  private totalShips: Starship[] = [];
  private currentPage = 0;
  private pageSize = 10;
  private cache = new Map<number, Starship[]>();


  loadFirstPage() {
    if (this.loading()) {return;}

    this.resetState();
    this.loading.set(true);
    this.error.set('');

    this.api.getStarships().subscribe({
      next: (response) => {
        this.totalShips = response;
        this.loadNextPage();
        this.loading.set(false);
      },
      error: ()=>{
        this.error.set('Failed to load starships. Please try again later.');
        this.loading.set(false);
      }
    });
  }

  loadNextPage(): void {
    if (!this.loadingMore()) {
      return;
    }

    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const nextPageData = this.totalShips.slice(startIndex, endIndex);

    this.cache.set(this.currentPage, nextPageData);
    this.starships.update(current => [...current, ...nextPageData]);
    this.currentPage++;

    if (endIndex >= this.totalShips.length) {
      this.loadingMore.set(false);
    }
  }
  retryLoad(): void {
    this.loadFirstPage();
  }

  updateStarships(  index: number,  field: keyof Starship, value: string): void {

    this.starships.update((starships) => {
      const updatedStarships = [...starships];

      updatedStarships[index] = {...updatedStarships[index],[field]: value};
    return updatedStarships;

  });
}

  private resetState(): void {
    this.starships.set([]);
    this.totalShips = [];
    this.currentPage = 0;
    this.loadingMore.set(true);
    this.cache.clear();
  }
}
