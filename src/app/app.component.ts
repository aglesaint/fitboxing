import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundsService } from './services/rounds.service';
import { Round, RoundsData } from './models/round.model';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
    title = 'Fitboxing';
    sessionTitle: string = '';
    challenges: Round[] = [];

    constructor(private roundsService: RoundsService) { }

    ngOnInit(): void {
        this.roundsService.getAllRoundsData().subscribe((data: RoundsData) => {
            this.sessionTitle = data.title;
            this.challenges = data.rounds;
        });
    }
}

