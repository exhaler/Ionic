import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecentObitsPage } from './recent-obits.page';

describe('RecentObitsPage', () => {
  let component: RecentObitsPage;
  let fixture: ComponentFixture<RecentObitsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentObitsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecentObitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
