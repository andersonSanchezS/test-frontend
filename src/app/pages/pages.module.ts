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

@NgModule({
  declarations: [
    PositionsComponent,
    CitiesComponent,
    DivisionsComponent,
    TeamsComponent,
    PlayersComponent,
    MatchesComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class PagesModule {}