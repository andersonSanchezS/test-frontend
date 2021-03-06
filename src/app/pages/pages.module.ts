import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PositionsComponent } from './positions/positions.component';
import { CitiesComponent } from './cities/cities.component';
import { DivisionsComponent } from './divisions/divisions.component';
import { TeamsComponent } from './teams/teams.component';
import { PlayersComponent } from './players/players.component';
import { MatchesComponent } from './matches/matches.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddCityComponent } from './cities/add-city/add-city.component';
import { EditCityComponent } from './cities/edit-city/edit-city.component';
import { EditDivisionComponent } from './divisions/edit-division/edit-division.component';
import { AddDivisionComponent } from './divisions/add-division/add-division.component';
import { AddTeamComponent } from './teams/add-team/add-team.component';
import { EditTeamComponent } from './teams/edit-team/edit-team.component';
import { AddMatchComponent } from './matches/add-match/add-match.component';
import { AddPlayerComponent } from './players/add-player/add-player.component';
import { EditPlayerComponent } from './players/edit-player/edit-player.component';

@NgModule({
  declarations: [
    PositionsComponent,
    CitiesComponent,
    DivisionsComponent,
    TeamsComponent,
    PlayersComponent,
    MatchesComponent,
    DashboardComponent,
    AddCityComponent,
    EditCityComponent,
    EditDivisionComponent,
    AddDivisionComponent,
    AddTeamComponent,
    EditTeamComponent,
    AddMatchComponent,
    AddPlayerComponent,
    EditPlayerComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class PagesModule {}
