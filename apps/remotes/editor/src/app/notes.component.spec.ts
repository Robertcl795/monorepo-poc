import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotesComponent } from './notes.component';

describe('NotesComponent (editor remote)', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('calculates word and character counts', () => {
    component.noteText = 'native federation rocks';
    expect(component.wordCount()).toBe(3);
    expect(component.chars()).toBe(23);
  });
});
