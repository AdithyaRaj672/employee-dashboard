import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /employees when navigateToEmployees is called', () => {
    spyOn(router, 'navigate');
    component.navigateToEmployees();
    expect(router.navigate).toHaveBeenCalledWith(['/employees']);
  });

  it('should navigate to /add-employee when navigateToAddEmployee is called', () => {
    spyOn(router, 'navigate');
    component.navigateToAddEmployee();
    expect(router.navigate).toHaveBeenCalledWith(['/add-employee']);
  });
});
