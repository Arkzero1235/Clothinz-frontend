import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { CollectionsComponent } from './pages/collections/collections';
import { ProductDetailComponent } from './pages/product-detail/product-detail';
import { AccountComponent } from './pages/account/account';
import { CartComponent } from './pages/cart/cart';
import { CheckoutComponent } from './pages/checkout/checkout';

export const routes: Routes = [
  { path: '',            component: HomeComponent },
  { path: 'collections', component: CollectionsComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'account',     component: AccountComponent },
  { path: 'cart',        component: CartComponent },
  { path: 'checkout',    component: CheckoutComponent },
  { path: '**',          redirectTo: '' },
];
