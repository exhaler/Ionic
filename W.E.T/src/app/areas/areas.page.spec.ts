import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AreasPage } from './areas.page';

describe('AreasPage', () => {
  let component: AreasPage;
  let fixture: ComponentFixture<AreasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AreasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
