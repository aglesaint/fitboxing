import { Component, OnInit, HostListener } from '@angular/core';
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

    // État du pull-to-refresh
    isRefreshing = false;
    pullDistance = 0;
    startY = 0;
    isPulling = false;
    readonly PULL_THRESHOLD = 80; // Distance minimale pour déclencher le refresh

    constructor(private roundsService: RoundsService) { }

    ngOnInit(): void {
        this.loadData();
    }

    loadData(): void {
        this.roundsService.getAllRoundsData().subscribe((data: RoundsData) => {
            this.sessionTitle = data.title;
            this.challenges = data.rounds;
            this.isRefreshing = false;
            this.pullDistance = 0;
        });
    }

    @HostListener('touchstart', ['$event'])
    onTouchStart(event: TouchEvent): void {
        if (window.scrollY === 0) {
            this.startY = event.touches[0].clientY;
            this.isPulling = true;
        }
    }

    @HostListener('touchmove', ['$event'])
    onTouchMove(event: TouchEvent): void {
        if (!this.isPulling || this.isRefreshing) return;

        const currentY = event.touches[0].clientY;
        const deltaY = currentY - this.startY;

        if (deltaY > 0 && window.scrollY === 0) {
            event.preventDefault();
            this.pullDistance = Math.min(deltaY * 0.5, this.PULL_THRESHOLD * 1.5);
        } else {
            this.isPulling = false;
            this.pullDistance = 0;
        }
    }

    @HostListener('touchend', ['$event'])
    onTouchEnd(): void {
        if (this.pullDistance >= this.PULL_THRESHOLD && !this.isRefreshing) {
            this.isRefreshing = true;
            this.loadData();
        } else {
            this.pullDistance = 0;
        }
        this.isPulling = false;
    }
}

