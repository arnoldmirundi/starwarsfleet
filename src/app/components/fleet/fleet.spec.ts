import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Fleet } from './fleet';
import { Api } from '../../services/api';
import { Starship } from '../../models/starship';

describe('Fleet component', () => {
  let component: Fleet;
  let fixture: ComponentFixture<Fleet>;

  const mockShips: Starship[] = [
  {
    name: 'CR90 corvette',
    model: 'CR90 corvette',
    manufacturer: 'Corellian Engineering Corporation',
    cost_in_credits: '3500000',
    length: '150',
    max_atmosphering_speed: '950',
    crew: '30-165',
    passengers: '600',
    cargo_capacity: '3000000',
    consumables: '1 year',
    hyperdrive_rating: '2.0',
    MGLT: '60',
    starship_class: 'corvette',
  },
];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fleet],
      providers: [
        {
          provide: Api,
          useValue: {
            getStarships: () => of(mockShips),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Fleet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should update editable name cell in client state', () => {
    component.ships.updateStarships(0, 'name', 'Edited Corvette');

    expect(component.ships.starships()[0].name).toBe('Edited Corvette');
  });
});