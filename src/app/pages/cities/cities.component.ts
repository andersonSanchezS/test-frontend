import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TournamentService } from 'src/app/services/tournament.service';
import { ICity } from '../../core/intefaces/city.interface';
import { AddCityComponent } from './add-city/add-city.component';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss'],
})
export class CitiesComponent implements OnInit {
  public createCityForm!: FormGroup;
  public id: number = 0;

  public columns = [
    {
      columnDef: 'Id',
      header: 'Id',
      cell: (city: ICity) => `${city.id}`,
    },
    {
      columnDef: 'Description',
      header: 'Ciudad',
      cell: (city: ICity) => `${city.description}`,
    },
  ];

  // Angular Material Data
  public displayedColumns = this.columns.map((c) => c.columnDef);
  public dataSource: ICity[] = [];

  constructor(
    private tournamentService: TournamentService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCities();
  }

  getCities(): void {
    this.tournamentService.getCities().subscribe((city) => {
      console.log(city);
      this.dataSource = city.data;
      console.log(this.dataSource);
    });
  }

  addNewCity(): void {
    const addCityRef = this.dialog.open(AddCityComponent, {
      restoreFocus: false,
      panelClass: 'custom-dialog-styles',
    });

    addCityRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getCities();
      }
    });
  }
  redirectToCity(city: ICity): any {
    this.router.navigate(['/tournament/cities/edit', city.id]);
  }
}
