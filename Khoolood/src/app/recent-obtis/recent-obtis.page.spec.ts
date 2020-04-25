import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecentObtisPage } from './recent-obtis.page';

describe('RecentObtisPage', () => {
  let component: RecentObtisPage;
  let fixture: ComponentFixture<RecentObtisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentObtisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecentObtisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
