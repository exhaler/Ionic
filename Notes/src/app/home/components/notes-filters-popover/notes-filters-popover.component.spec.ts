import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotesFiltersPopoverComponent } from './notes-filters-popover.component';

describe('NotesFiltersPopoverComponent', () => {
  let component: NotesFiltersPopoverComponent;
  let fixture: ComponentFixture<NotesFiltersPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesFiltersPopoverComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotesFiltersPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
