import { Component, OnInit, OnDestroy, ViewChild, ElementRef, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundsService } from './services/rounds.service';
import { Round, RoundsData } from './models/round.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('scrollContainer', { static: true }) containerRef!: ElementRef<HTMLDivElement>;
  title = 'Fitboxing';
  // --- State signals ---
  sessionTitle = signal('');
  challenges = signal<Round[]>([]);
  isRefreshing = signal(false);
  isLoading = signal(false);
  pullDistance = signal(0);
  isPulling = signal(false);

  readonly PULL_THRESHOLD = 80;
  private startY = 0;

  constructor(private roundsService: RoundsService) { }

  ngOnInit(): void {
    this.loadData();

    // Bloque le pull-to-refresh Safari
    document.addEventListener('touchmove', this.preventPullToRefresh, { passive: false });

    // Optionnel : effet pour reset pullDistance automatiquement si scroll remonté
    effect(() => {
      if (this.pullDistance() === 0 && this.isPulling()) {
        this.isPulling.set(false);
      }
    });
  }

  ngOnDestroy(): void {
    document.removeEventListener('touchmove', this.preventPullToRefresh);
  }

  // Empêche le refresh Safari
  preventPullToRefresh = (e: TouchEvent) => {
    const atTop = this.containerRef?.nativeElement.scrollTop === 0;
    if (atTop && this.pullDistance() > 0) {
      e.preventDefault();
    }
  };

  // --- Pull-to-refresh handlers ---
  onTouchStart(event: TouchEvent) {
    if (this.containerRef.nativeElement.scrollTop === 0 && !this.isLoading()) {
      this.startY = event.touches[0].clientY;
      this.isPulling.set(true);
    }
  }

  onTouchMove(event: TouchEvent) {
    if (!this.isPulling() || this.isLoading()) return;

    const currentY = event.touches[0].clientY;
    const deltaY = currentY - this.startY;
    const atTop = this.containerRef.nativeElement.scrollTop === 0;

    if (deltaY > 0 && atTop) {
      event.preventDefault();
      this.pullDistance.set(Math.min(deltaY * 0.5, this.PULL_THRESHOLD * 1.5));

      // petit feedback haptique
      if (this.pullDistance() >= this.PULL_THRESHOLD && 'vibrate' in navigator) {
        navigator.vibrate(10);
      }
    } else {
      this.resetPullState();
    }
  }

  onTouchEnd() {
    if (this.pullDistance() >= this.PULL_THRESHOLD && !this.isLoading()) {
      this.isRefreshing.set(true);
      this.loadData();
    } else {
      this.pullDistance.set(0);
    }
    this.isPulling.set(false);
  }

  // --- Data loader ---
  loadData() {
    if (this.isLoading()) return;

    this.isLoading.set(true);

    this.roundsService.getAllRoundsData().subscribe({
      next: (data: RoundsData) => {
        this.sessionTitle.set(data.title);
        this.challenges.set(data.rounds);
        this.resetPullState();
      },
      error: (err) => {
        console.error('Error loading data', err);
        this.resetPullState();
      }
    });
  }

  private resetPullState() {
    this.isRefreshing.set(false);
    this.isLoading.set(false);
    this.pullDistance.set(0);
    this.isPulling.set(false);
  }

  // --- Computed for template ---
  pullActive = computed(() => this.pullDistance() >= this.PULL_THRESHOLD);
}
