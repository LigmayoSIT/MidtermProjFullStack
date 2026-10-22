import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KantoRegistry } from './kanto-registry';

describe('KantoRegistry', () => {
  let component: KantoRegistry;
  let fixture: ComponentFixture<KantoRegistry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KantoRegistry],
    }).compileComponents();

    fixture = TestBed.createComponent(KantoRegistry);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
