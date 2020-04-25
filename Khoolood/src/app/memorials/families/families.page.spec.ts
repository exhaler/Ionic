import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FamiliesPage } from './families.page';

describe('FamiliesPage', () => {
  let component: FamiliesPage;
  let fixture: ComponentFixture<FamiliesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamiliesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FamiliesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
