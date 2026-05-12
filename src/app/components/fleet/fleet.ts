import { Component, computed, OnInit, inject, signal } from '@angular/core';
import { Starships } from '../../services/starships';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CellValueChangedEvent, ColDef, GridReadyEvent,GridApi } from 'ag-grid-community';
import { Starship } from '../../models/starship';
import { AgGridAngular } from 'ag-grid-angular';


@Component({
  selector: 'app-fleet',
  imports: [ScrollingModule, CommonModule,FormsModule, AgGridAngular],
  templateUrl: './fleet.html',
  styleUrl: './fleet.css',
})
export class Fleet implements OnInit {
  ships = inject(Starships);
  private gridApi!: GridApi<Starship>;
  endMessage = signal(false);
  rowData = computed(() => this.ships.filterStarships());
  columnDefaults: ColDef<Starship>[] =[
    { field: 'name', headerName: 'Name', editable: true, minWidth: 150,cellStyle:{paddingLeft:'24px'}, },
    { field: 'model', headerName: 'Model', minWidth: 150 },
    { field: 'manufacturer', headerName: 'Manufacturer',  minWidth: 150 },
    { field: 'cost_in_credits', headerName: 'Cost in Credits', minWidth: 120 },
    { field: 'length', headerName: 'Length',  minWidth: 120 },
    { field: 'max_atmosphering_speed', headerName: 'Max Atmosphering Speed',  minWidth: 120 },
    { field: 'crew', headerName: 'Crew', minWidth: 120 },
    { field: 'passengers', headerName: 'Passengers',  minWidth: 120 },
    { field: 'cargo_capacity', headerName: 'Cargo Capacity',  minWidth: 120 },
    { field: 'consumables', headerName: 'Consumables',  minWidth: 120 },
    { field: 'hyperdrive_rating', headerName: 'Hyperdrive Rating',  minWidth: 120 },
    { field: 'MGLT', headerName: 'MGLT',  minWidth: 120 },
    { field: 'starship_class', headerName: 'Starship Class',  minWidth: 150 }
  ];

  defaultColumnAttributes: ColDef = {
    resizable: true,
    sortable: false,
    filter: false,
    suppressMovable: true,
  };

  ngOnInit(): void {
    this.ships.loadFirstPage();
  }

    onGridReady(event: GridReadyEvent): void {
      this.gridApi = event.api;
      event.api.sizeColumnsToFit();
    }


   onBodyScrollEnd(): void {
    if(!this.gridApi) return;

    const lastVisibleRow = this.gridApi.getLastDisplayedRowIndex();

    const totalDisplayedRows = this.gridApi.getDisplayedRowCount()

    if (lastVisibleRow >= totalDisplayedRows - 1 && this.ships.loadingMore()) {
      this.ships.loadNextPage();
    }
    this.endMessage.set(lastVisibleRow >= totalDisplayedRows - 1 && !this.ships.loadingMore());
  }

  updateSearchTerm(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.ships.searchTerm.set(input);
  }

  onCellValueChanged(event: CellValueChangedEvent<Starship>): void {
    if (!event.colDef.field || event.rowIndex === null) return;

    this.ships.updateStarships(
      event.rowIndex,
      event.colDef.field as keyof Starship,
      String(event.newValue)
    );
  }
}