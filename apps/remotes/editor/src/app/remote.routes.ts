import { Routes } from '@angular/router';
import { EditorLayoutComponent } from './editor-layout.component';
import { DraftsComponent } from './drafts.component';
import { NotesComponent } from './notes.component';
import { ScratchComponent } from './scratch.component';

export const REMOTE_ROUTES: Routes = [
  {
    path: '',
    component: EditorLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'notes' },
      { path: 'notes', component: NotesComponent },
      { path: 'drafts', component: DraftsComponent },
      { path: 'scratch', component: ScratchComponent },
    ],
  },
];
