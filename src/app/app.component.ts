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
  sessionTitle = signal('');
  challenges = signal<Round[]>([]);
  isRefreshing = signal(false);
  isLoading = signal(false);
  pullDistance = signal(0);
  isPulling = signal(false);

  readonly PULL_THRESHOLD = 80;
  private startY = 0;

  // ✅ Flèches pour conserver le contexte "this" lors du removeEventListener
  private boundTouchStart = (e: TouchEvent) => this.onTouchStart(e);
  private boundTouchMove  = (e: TouchEvent) => this.onTouchMove(e);
  private boundTouchEnd   = ()              => this.onTouchEnd();

  constructor(private roundsService: RoundsService) {
    // ✅ effect() doit être dans le constructeur (injection context requis)
    effect(() => {
      if (this.pullDistance() === 0 && this.isPulling()) {
        this.isPulling.set(false);
      }
    });
  }

  ngOnInit(): void {
    this.loadData();

    const el = this.containerRef.nativeElement;

    // ✅ Enregistrement manuel NON-PASSIF → preventDefault() fonctionnera sur iOS
    el.addEventListener('touchstart', this.boundTouchStart, { passive: true });
    el.addEventListener('touchmove',  this.boundTouchMove,  { passive: false });
    el.addEventListener('touchend',   this.boundTouchEnd,   { passive: true });
  }

  ngOnDestroy(): void {
    const el = this.containerRef.nativeElement;
    el.removeEventListener('touchstart', this.boundTouchStart);
    el.removeEventListener('touchmove',  this.boundTouchMove);
    el.removeEventListener('touchend',   this.boundTouchEnd);
  }

  onTouchStart(event: TouchEvent) {
    if (this.containerRef.nativeElement.scrollTop === 0 && !this.isLoading()) {
      this.startY = event.touches[0].clientY;
      this.isPulling.set(true);
    }
  }

  onTouchMove(event: TouchEvent) {
    if (!this.isPulling() || this.isLoading()) return;

    const currentY = event.touches[0].clientY;
    const deltaY   = currentY - this.startY;
    const atTop    = this.containerRef.nativeElement.scrollTop === 0;

    if (deltaY > 0 && atTop) {
      event.preventDefault(); // ✅ fonctionne car listener non-passif
      this.pullDistance.set(Math.min(deltaY * 0.5, this.PULL_THRESHOLD * 1.5));

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

  pullActive = computed(() => this.pullDistance() >= this.PULL_THRESHOLD);
}