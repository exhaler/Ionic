import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ObituariesComponent } from './obituaries.component';

describe('ObituariesComponent', () => {
  let component: ObituariesComponent;
  let fixture: ComponentFixture<ObituariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObituariesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ObituariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
