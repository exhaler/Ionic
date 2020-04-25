import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MemorialsPage } from './memorials.page';

describe('MemorialsPage', () => {
  let component: MemorialsPage;
  let fixture: ComponentFixture<MemorialsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemorialsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MemorialsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
