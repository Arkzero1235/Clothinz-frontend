import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductAttributes } from './product-attributes';

describe('ProductAttributes', () => {
  let component: ProductAttributes;
  let fixture: ComponentFixture<ProductAttributes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAttributes]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductAttributes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return displayable attributes', () => {
    fixture.componentRef.setInput('attributes', [
      { name: 'Size', values: ['S', 'M', 'L'] },
      { name: 'Color', values: ['Red', 'Blue'] }
    ]);
    fixture.detectChanges();

    expect(component.displayAttributes().length).toBe(2);
    expect(component.displayAttributes()[0].name).toBe('Size');
  });

  it('should emit attribute change', () => {
    let emittedValue: { name: string; value: string } | undefined;
    component.attributeChange.subscribe(val => {
      emittedValue = val;
    });

    component.selectAttribute('Size', 'M');

    expect(emittedValue).toEqual({ name: 'Size', value: 'M' });
  });

  it('should check if attribute is selected', () => {
    fixture.componentRef.setInput('selectedAttributes', { Size: 'M', Color: 'Red' });
    fixture.detectChanges();

    expect(component.isSelected('Size', 'M')).toBe(true);
    expect(component.isSelected('Size', 'L')).toBe(false);
  });
});
