import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommemorationsPage } from './commemorations.page';

describe('CommemorationsPage', () => {
  let component: CommemorationsPage;
  let fixture: ComponentFixture<CommemorationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommemorationsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommemorationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
