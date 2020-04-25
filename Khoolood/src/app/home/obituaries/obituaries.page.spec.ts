import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ObituariesPage } from './obituaries.page';

describe('ObituariesPage', () => {
  let component: ObituariesPage;
  let fixture: ComponentFixture<ObituariesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObituariesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ObituariesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
