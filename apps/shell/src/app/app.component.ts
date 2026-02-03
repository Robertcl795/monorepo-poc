import { Component, computed, effect, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import {
  CvAppShellComponent,
  RemoteName,
  RemoteStore,
  RcButtonComponent,
} from '@rocker-code/shared';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ThemeComponent } from '@rocker-code/theme';
import { REMOTE_REGISTRY } from './remote-registry';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RcButtonComponent,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    CvAppShellComponent,
    ThemeComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly router = inject(Router);
  private readonly remoteStore = inject(RemoteStore);

  readonly navItems = REMOTE_REGISTRY.map((remote) => ({
    key: remote.key,
    label: remote.label,
    description: remote.description,
    icon: remote.icon,
  }));

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
      startWith(this.router.url),
    ),
  );

  readonly currentRemote = computed<RemoteName>(() => {
    const url = this.currentUrl();
    const match = REMOTE_REGISTRY.find((item) => url?.startsWith(`/${item.routePath}`));
    return (match?.key as RemoteName) ?? null;
  });

  constructor() {
    effect(() => {
      this.remoteStore.setRemote(this.currentRemote());
    });
  }

  onNavigate(route: string): void {
    const entry = REMOTE_REGISTRY.find((remote) => remote.key === route);
    if (!entry) return;
    this.remoteStore.setRemote(entry.key);
    this.router.navigate(['/', entry.routePath]).catch(console.error);
  }
}
