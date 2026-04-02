import { Component } from '@angular/core';
import { CollectionsFilterSidebarComponent } from '../../components/collections/collections-filter-sidebar/collections-filter-sidebar';
import { CollectionsProductsAreaComponent } from '../../components/collections/collections-products-area/collections-products-area';

@Component({
  standalone: true,
  selector: 'app-collections',
  imports: [CollectionsFilterSidebarComponent, CollectionsProductsAreaComponent],
  templateUrl: './collections.html',
  styleUrl: './collections.scss'
})
export class CollectionsComponent {
  priceRange = 1250;
  selectedBrand = 'clothinz';
  sortBy = 'new';
  currentPage = 1;

  categories = [
    { label: 'Apparel', checked: false },
    { label: 'Accessories', checked: true },
    { label: 'Home Objects', checked: false },
    { label: 'Footwear', checked: false },
  ];

  products = [
    {
      id: 1, brand: 'Clothinz House', name: 'Architectural Trench', price: '$450.00',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYACEzWb_x2-8pb26H_NlPrznPxHRlTle161Qqyta4qtS8ElSpv60ZllUAXYC9oF9qH1YFckZOaT3MjhmFThwT4YjNAeE5gX7hhAbkyCRYbKRs0wjKpH5qHtzPKRPpnxSw3LGIrb2aM2RcrQfto0Hayi1II92eSQXa98V7EF7Dcd-4PfbSyHVET4k3kB53mjjYzpLVX8YQ2DUVm-rpox0QRYbA2ITPNdlR2buJTJt-xku8Tqg1c7qumbNU9HTATDaAHrnxbrQuHIw'
    },
    {
      id: 2, brand: 'Footwear Lab', name: 'Cognac Leather Loafers', price: '$320.00',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBc8jqel7a1cSyc2kxgxPu2RSg3ruBpM6xTRzGGR7thcw7eFJszMyx5PkROr7SHswmsqLOxEA5w_1n1a9v1Whp0oOX_vG4Cnivqd-2N7D9wyTkbw8UhFulw1rRy4OgQiTS8yik4wyrvcbaEtRMpz17pOUAVLPskcuXqDBOGP9GyX3Ojs54QtzlxMoS_gxJGp9Dmy-n-a59DgQkF1qvryx00USFy2Lawp7uoCVCcmCBugO8Fd7oiH-MQwIdXZz339p5q3OkfQfMYHtM'
    },
    {
      id: 3, brand: 'Minimalist Studio', name: 'Chronos Series 01', price: '$890.00',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHbUKN5SppsAiV-LN4-B9P9_AAqqJ8AL_F3a77o2Zy_pcwyuQZ0va9FUL7V03A3OoGj0m80uuJdyHOfd8Otl8ACaBNw1KDe--BLarG7__bKjvrkrYFCBGucpappcyupsiO_CE-_48_jnWgVXNEjjThbW2vNh7xxCnUPPHoKtmGXWaL6Y4s7_lwuUAJ7DN54Se-YKU8vFEzb3SfsjaAfhkltZCC5MkxkuUQth_uZRSdtJXs97JT4pTwrF-0A_K4OExqDfCqLQalKuE'
    },
    {
      id: 4, brand: 'Footwear Lab', name: 'Nuance Low-Top', price: '$210.00',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4J8SLgww9BHQetC34d2nqsyMiC_mjVq6v_hQRcnwUKziTcGjyMq9mC7hags1_Pei8retclHYqei6PCMAV7hLu3uNEUN4e6XqymO-bN3CoQBaUnBheLRtWsjBY-SJBPGDlloi9WiSlgVNF5msK3MUHpdGbwIiQq6z3vZkC3ig0_8CqCXCRXwpeWXP1XqoZfTHZSwFdtQaCyT6_P7gVEdSiCngk2w0EupCqMwiQ21LlJAgH0bi0bwQfd_RyysPx1R0Z-B97fNpsbmQ'
    },
    {
      id: 5, brand: 'Loom & Thread', name: 'Merino Mock Neck', price: '$185.00',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhvsSIymCOyAmvGR8Ds-3rwgBVp-7J9pyOjYueyPBq-9Ziv6rp8topvFrhPLAHXH5Bsbm-f5mGrm6gO0eW5zngAkc-ANQ-_jnTIDfP-v8XOeyWNE7aM4pT8uGyEWRGypc521t_51hlaxG0MasKbE-dvwC-qQF-MtMwHZvsb9V2q0mou2SLOuaQlYWAw8Yu5S4rGt-cTA5YRrpHhLOcxVGFd49Nr5Yi_T1YaJH_r8yD1OTid7iDoN9v4Y1EkWTRrZ1VBGwwULrsPik'
    },
    {
      id: 6, brand: 'Clothinz House', name: 'Sculptural Tote Bag', price: '$620.00',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaFU5o8W1UQaEajYF8Dv2F0WBrg9Y7fQD08cFNyNruUSjwZDSmcUVEEd2yRheIdAu6GRoUBDkeGehAjAl39LXwFWs5d_jT2eAER8-isWKyQvagMGLLb4ci63SLm626yfadyKiCmmAyj8RKxoD7ctKdTJtZ-TZ1fPjePFvRX9z2uT7a6xcO23AvFjo85-1cArv4Js-2-m9zktLsYUhz-rFqvLGr1kaDj-GiJpragwcSvSgzYMfrRAk'
    },
  ];
}
