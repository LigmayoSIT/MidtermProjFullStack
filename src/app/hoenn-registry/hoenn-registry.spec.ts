import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HoennRegistry } from './hoenn-registry';

describe('HoennRegistry', () => {
  let component: HoennRegistry;
  let fixture: ComponentFixture<HoennRegistry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoennRegistry],
    }).compileComponents();

    fixture = TestBed.createComponent(HoennRegistry);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
