import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-footer',
  imports: [RouterLink, NzInputModule, NzButtonModule, FormsModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class FooterComponent {
  email = '';
}
