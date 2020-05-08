import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InventoryEditPage } from './inventory-edit.page';

describe('InventoryEditPage', () => {
  let component: InventoryEditPage;
  let fixture: ComponentFixture<InventoryEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
