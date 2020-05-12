import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SourcePage } from './source.page';

describe('SourcePage', () => {
  let component: SourcePage;
  let fixture: ComponentFixture<SourcePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourcePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SourcePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
