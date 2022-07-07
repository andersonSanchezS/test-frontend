import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ITeam } from '../../../core/intefaces/team.interface';
import { TournamentService } from '../../../services/tournament.service';
import { IDivision } from '../../../core/intefaces/division.interface';
import { ICity } from '../../../core/intefaces/city.interface';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.scss'],
})
export class EditTeamComponent implements OnInit {
  public updateTeamForm!: FormGroup;
  public idTeam!: number;
  public teamName: string = '';
  public cities: ICity[] = [];
  public divisions: IDivision[] = [];

  constructor(
    private _fb: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private tournamentService: TournamentService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.activatedRoute.params.subscribe(({ id }) => (this.idTeam = id));
  }

  ngOnInit(): void {
    this.updateTeamForm = this.createTeamFormulary();

    this.tournamentService.getTeamById(this.idTeam).subscribe((data) => {
      const { name, numberOfPlayers, city, division } = data.data;
      this.updateTeamForm.setValue({
        name,
        numberOfPlayers,
        city,
        division,
      });
      this.teamName = name;
    });

    this.getCities();
    this.getDivisions();
  }

  createTeamFormulary(): FormGroup {
    return this._fb.group({
      name: ['', Validators.required],
      numberOfPlayers: ['', Validators.required],
      city: ['', Validators.required],
      division: ['', Validators.required],
    });
  }

  get formValues(): ITeam {
    return this.updateTeamForm.value;
  }

  updateTeam(): void {
    this.tournamentService
      .updateTeams(this.idTeam, this.updateTeamForm.value)
      .subscribe(
        (data) => {
          this._snackBar.open('Team updated successfully');
          this.router.navigate(['/tournament/teams']);
        },
        (error) => {
          console.log(error);
          this._snackBar.open('Error updating team');
        }
      );
  }

  deleteTeam(): void {
    this.tournamentService.deleteTeam(this.idTeam).subscribe(() => {
      this._snackBar.open('Team deleted successfully');
      this.router.navigate(['/tournament/teams']);
    });
  }

  onBack(): void {
    this.location.back();
  }

  getCities() {
    this.tournamentService.getCities().subscribe((cities) => {
      this.cities = cities.data;
    });
  }

  getDivisions() {
    this.tournamentService.getDivisions().subscribe((divisions) => {
      this.divisions = divisions.data;
    });
  }
}
