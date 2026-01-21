import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CvAppShellComponent } from './cv-app-shell.component';

describe('CvAppShellComponent', () => {
  let component: CvAppShellComponent;
  let fixture: ComponentFixture<CvAppShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvAppShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CvAppShellComponent);
    component = fixture.componentInstance;
    component.appName.set('Test App');
    component.sectionName.set('Test Section');
    component.navItems.set([{ key: 'one', label: 'One' }]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits navigate when nav clicked', () => {
    const spy = vi.fn();
    //eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    component.navigate.subscribe(spy);
    const button: HTMLButtonElement | null = fixture.nativeElement.querySelector(
      'button.cv-shell__nav-item',
    );
    button?.click();
    expect(spy).toHaveBeenCalledWith('one');
  });
});
