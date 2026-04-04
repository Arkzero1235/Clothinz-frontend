import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScrollToTop } from "@shared/components/scroll-to-top/scroll-to-top";
import { ToastComponent } from "@shared/components/toast/toast";
import { ConfirmComponent } from "@shared/components/confirm/confirm";
import { QuickViewComponent } from "@shared/components/quick-view/quick-view";
import { ChatbotWidgetComponent } from "@shared/components/chatbot-widget/chatbot-widget.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ScrollToTop, ToastComponent, ConfirmComponent, QuickViewComponent, ChatbotWidgetComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('app');
}
