import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JohtoRegistry } from './johto-registry';

describe('JohtoRegistry', () => {
  let component: JohtoRegistry;
  let fixture: ComponentFixture<JohtoRegistry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JohtoRegistry],
    }).compileComponents();

    fixture = TestBed.createComponent(JohtoRegistry);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
