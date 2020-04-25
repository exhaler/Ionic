import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IndividualsPage } from './individuals.page';

describe('IndividualsPage', () => {
  let component: IndividualsPage;
  let fixture: ComponentFixture<IndividualsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IndividualsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
