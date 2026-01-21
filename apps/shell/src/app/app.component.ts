import { Component, computed, effect, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { RemoteName, RemoteStore } from '@rocker-code/shared';
import { ThemeComponent } from '@rocker-code/theme';
import { RcButtonComponent } from '@rocker-code/shared';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ThemeComponent, RcButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly router = inject(Router);
  private readonly remoteStore = inject(RemoteStore);

  readonly navItems = [
    { route: 'editor', label: 'Editor', description: 'Notes & ideation space', emoji: '✏️' },
    { route: 'rocky', label: 'Rocky', description: 'Search & spotlight', emoji: '🔎' },
    { route: 'challenger', label: 'Challenger', description: 'Planner & calendar', emoji: '📆' },
  ] satisfies ReadonlyArray<{
    route: RemoteName;
    label: string;
    description: string;
    emoji: string;
  }>;

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
      startWith(this.router.url),
    ),
  );

  readonly currentRemote = computed<RemoteName>(() => {
    const url = this.currentUrl();
    const match = this.navItems.find((item) => url?.startsWith(`/${item.route}`));
    return (match?.route as RemoteName) ?? null;
  });

  constructor() {
    effect(() => {
      this.remoteStore.setRemote(this.currentRemote());
    });
  }

  onNavigate(route: RemoteName): void {
    this.remoteStore.setRemote(route);
  }
}
