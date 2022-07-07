import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TournamentService } from '../../../services/tournament.service';
import { ICity } from '../../../core/intefaces/city.interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.scss'],
})
export class EditCityComponent implements OnInit {
  // Properties
  public updateCityForm!: FormGroup;
  public idCity!: number;
  public cityName: string = '';

  constructor(
    private _fb: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private tournamentService: TournamentService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.activatedRoute.params.subscribe(({ id }) => (this.idCity = id));
  }

  // Init form and set the values
  ngOnInit(): void {
    this.updateCityForm = this.createCityFormulary();

    this.tournamentService.getCityById(this.idCity).subscribe((city) => {
      const { description } = city.data;
      // Set the values
      this.updateCityForm.setValue({ description });
      this.cityName = description;
    });
  }

  // Formulary
  createCityFormulary(): FormGroup {
    return this._fb.group({
      description: ['', Validators.required],
    });
  }

  get formValues(): ICity {
    return this.updateCityForm.value;
  }

  // Update the city
  updateCity(): void {
    this.tournamentService
      .updateCity(this.idCity, this.updateCityForm.value)
      .subscribe(
        (data) => {
          this._snackBar.open('City updated successfully');
          this.router.navigate(['/tournament/cities']);
        },
        (error) => {
          console.log(error);
          this._snackBar.open('Error updating city');
        }
      );
  }

  // Delete the city
  deleteCity(): void {
    this.tournamentService.deleteCity(this.idCity).subscribe(() => {
      this._snackBar.open('City deleted successfully');
      this.router.navigate(['/tournament/cities']);
    });
  }

  // Cancel the update
  onBack(): void {
    this.location.back();
  }
}
