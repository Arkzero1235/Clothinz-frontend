import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductAttributesComponent } from './product-attributes';
import { TranslateModule } from '@ngx-translate/core';

describe('ProductAttributesComponent', () => {
  let component: ProductAttributesComponent;
  let fixture: ComponentFixture<ProductAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAttributesComponent, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return display attributes', () => {
    const attributes = [{ name: 'size', value: 'L' }, { name: 'color', value: 'red' }];
    fixture.componentRef.setInput('attributes', attributes);
    fixture.detectChanges();

    expect(component.getDisplayAttributes().length).toBe(2);
  });
});
