import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss'],
})
export class CitiesComponent implements OnInit {
  public createCityForm!: FormGroup;
  public id: number = 0;

  constructor(
    private _fb: FormBuilder,
    private readonly tournamentService: TournamentService
  ) {
    this.tournamentService.getCities().subscribe((data) => {
      this.dataSource = data.data;
    });
  }

  ngOnInit(): void {
    this.createCityForm = this.createCityFormulary();
  }

  displayedColumns: string[] = ['id', 'city', 'actions'];
  dataSource = [];

  createCityFormulary(): FormGroup {
    return this._fb.group({
      description: ['', Validators.required],
    });
  }

  create() {
    if (this.id === 0) {
      this.tournamentService.createCity(this.createCityForm.value).subscribe(
        (data) => {
          this.cancel();
          alert('City created successfully');
          this.tournamentService.getCities().subscribe((data) => {
            this.dataSource = data.data;
          });
        },
        (error) => {
          console.log(error);
          alert('Error creating city');
        }
      );
    } else {
      this.tournamentService
        .updateCity(this.id, this.createCityForm.value)
        .subscribe(
          (data) => {
            this.cancel();
            alert('City updated successfully');
            this.tournamentService.getCities().subscribe((data) => {
              this.dataSource = data.data;
            });
          },
          (error) => {
            console.log(error);
            alert('Error updating city');
          }
        );
    }
  }

  displayMenu() {
    document.getElementById('form')!.style.display = 'block';
    document.getElementById('addButton')!.style.display = 'none';
    this.createCityForm.reset();
  }

  cancel() {
    document.getElementById('form')!.style.display = 'none';
    document.getElementById('addButton')!.style.display = 'block';
    this.id = 0;
  }

  delete(id: number) {
    this.tournamentService.deleteCity(id).subscribe((data) => {
      console.log(data);
      alert('City deleted successfully');
      this.tournamentService.getCities().subscribe((data) => {
        this.dataSource = data.data;
      });
    });
  }

  handleUpdate(id: number, description: string) {
    document.getElementById('form')!.style.display = 'block';
    document.getElementById('addButton')!.style.display = 'none';
    this.id = id;
    this.createCityForm.setValue({ description });
  }
}
