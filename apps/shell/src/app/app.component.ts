import { Component, computed, effect, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { RemoteName, RemoteStore } from '@rocker-code/shared';
import { ThemeComponent } from '@rocker-code/theme';
import { RcButtonComponent } from '@rocker-code/shared';
import { CovalentMessageModule } from '@covalent/core/message';
import { CvAppShellComponent } from '@rocker-code/ui-components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ThemeComponent,
    RcButtonComponent,
    CovalentMessageModule,
    CvAppShellComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly router = inject(Router);
  private readonly remoteStore = inject(RemoteStore);

  readonly navItems = [
    { key: 'editor', label: 'Editor', description: 'Notes & ideation space', icon: 'edit' },
    { key: 'rocky', label: 'Rocky', description: 'Search & spotlight', icon: 'travel_explore' },
    {
      key: 'challenger',
      label: 'Challenger',
      description: 'Planner & calendar',
      icon: 'calendar_today',
    },
  ] satisfies ReadonlyArray<{
    key: RemoteName;
    label: string;
    description: string;
    icon: string;
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
    const match = this.navItems.find((item) => url?.startsWith(`/${item.key}`));
    return (match?.key as RemoteName) ?? null;
  });

  constructor() {
    effect(() => {
      this.remoteStore.setRemote(this.currentRemote());
    });
  }

  onNavigate(route: RemoteName): void {
    const target = route ?? null;
    if (!target) return;
    this.remoteStore.setRemote(target);
    this.router.navigate(['/', target]).catch(console.error);
  }
}
