import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Starships } from './starships';
import { Api } from './api';
import { Starship } from '../models/starship';

describe('Starships service', () => {
  let service: Starships;

  const mockShips: Starship[] = Array.from({ length: 12 }, (_, index) => ({
    name: `Ship ${index + 1}`,
    model: `Model ${index + 1}`,
    manufacturer: 'Test Manufacturer',
    cost_in_credits: '1000000',
    length: '150',
    max_atmosphering_speed: '950',
    crew: '10',
    passengers: '20',
    cargo_capacity: '1000',
    consumables: '1 year',
    hyperdrive_rating: '1.0',
    MGLT: '60',
    starship_class: 'corvette',
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Starships,
        {
          provide: Api,
          useValue: {
            getStarships: () => of(mockShips),
          },
        },
      ],
    });

    service = TestBed.inject(Starships);
  });

  it('should load first page and append next page', () => {
    service.loadFirstPage();

    expect(service.starships().length).toBe(10);
    expect(service.starships()[0].name).toBe('Ship 1');
    expect(service.loadingMore()).toBeTruthy();

    service.loadNextPage();

    expect(service.starships().length).toBe(12);
    expect(service.starships()[11].name).toBe('Ship 12');
    expect(service.loadingMore()).toBeFalsy();
  });
});