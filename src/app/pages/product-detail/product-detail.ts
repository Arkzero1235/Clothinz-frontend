import { Component, OnInit } from '@angular/core';
import { ProductDetailBreadcrumbComponent } from '../../components/product-detail/product-detail-breadcrumb/product-detail-breadcrumb';
import { ProductDetailGalleryComponent } from '../../components/product-detail/product-detail-gallery/product-detail-gallery';
import { ProductDetailInfoComponent } from '../../components/product-detail/product-detail-info/product-detail-info';
import { ProductDetailRelatedComponent } from '../../components/product-detail/product-detail-related/product-detail-related';

@Component({
  standalone: true,
  selector: 'app-product-detail',
  imports: [
    ProductDetailBreadcrumbComponent,
    ProductDetailGalleryComponent,
    ProductDetailInfoComponent,
    ProductDetailRelatedComponent
  ],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss'
})
export class ProductDetailComponent implements OnInit {
  ngOnInit() {
    window.scrollTo(0, 0);
  }

  selectedColor = 'ivory';
  selectedSize = 'S';

  colors = [
    { id: 'ivory', hex: '#dcd7cc' },
    { id: 'black', hex: '#1b1c1c' },
    { id: 'grey',  hex: '#3d424d' },
  ];

  sizes = ['XS', 'S', 'M', 'L'];

  related = [
    {
      id: 10, name: 'Wide-Leg Silk Trousers', price: '$850.00',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVd8e6jGYYL4ih04AULyigcT7t0z1Obc6I0ZUVUKc3TdFa0vBeFxiAB0xvt-q6KUfaYPbITKUN2tfiwtADzwgKf3mqX_Im8lX1QY9okeqZEKHO7neHROPOgUFEKjpyemVV1Rii1b6jCcMjcidSBAY2j2I44BiGklFONsUfsrDN4h-bMMhpcmcsdgsz3flTlOjHv2GMJ0oSjXDBLVk6AmwGF2GfRJLfav94kDwUCoKesBb1UP44V1QwOPlQ0AKACXRF4fi1bC1Z8oI'
    },
    {
      id: 11, name: 'Pointed Leather Mule', price: '$620.00',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAs1DC6FMNm0Jw99qeqtfRo4cwm2qz0whih_nZ3oSac8B7E746Xi8yUT_9rbcJGx5F10HGcLIbiSAA3GYkTZ1TOzIlkEYtFzRrMD9bD19EMSsigYuvkwolN9paSlaTtP9bTvrZmsxHbLSkR_cZlpauxuN59pNTBtRGqfXk7mbqzAu5MXqQAZrWn_VRkz81Ax0CWe6UnluNSrXE_a5vNzC7aG40qFoVMxCLnxtw9bWtteOH9c-lj2ip7EqnZC1ZP1XIZqammQnUAAmk'
    },
    {
      id: 12, name: 'Sculptural Clutch Bag', price: '$1,100.00',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGEYIU0w3_N0TTKufQF_TfkOhPdHoujVD_Y2muo12kDZvTZNnX5FIQCycldzzReFH6304zHEZ67mBcgJua_lfmBfcmGAnRkkbEgMQjbqY7rwZNat8A1LqEcmdjfjw1Xv89Hc2yN42VLbOJ579UTaL2JbF1WwwePUfu1XXqYVYMet6uzn0o9zknjLgnv6w1-P1EZ22wq8HNJRieP8H5NZ9FbS_bdiwbRZFuMS8Jlf0SgdgEyAQNnxI-gt_EE3vMyB0YdVEY6fs8vsk'
    },
    {
      id: 13, name: '18k Arch Hoops', price: '$450.00',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYzr00BhIQTfw8HoB1MY-BllrZa1gkcn1oSXELnJZUAI18p6uq3PxX2VEnLq4i4kECuETCtjgRHu9fNkpmw4_tCx45aTDv_yiU69bu4Vy9_k9Z42ZNSxeqJdUTnVW2WgNaO3zewENix-NkgrVUEgbvTl16g2gIQ6vQjuQq63KN-gCtPbwRmryq0zyQ4WN2l2mZN38Upwm0GQTyFrA5GY3NmXH8hEIP4u4M2JkyfAFyAIoRS268AY2ELBpJrJU98UKqTnGkX8_N0F4'
    },
  ];
}
