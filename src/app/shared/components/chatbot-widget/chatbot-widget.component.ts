import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { API_URL } from '@core/api/api-url';

interface ChatProductSuggestion {
  id: number;
  name: string;
  slug: string;
  price: number;
  stock: number;
  thumbnail: string | null;
}

interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
  suggestions?: ChatProductSuggestion[];
}

@Component({
  selector: 'app-chatbot-widget',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './chatbot-widget.component.html',
  styleUrls: ['./chatbot-widget.component.css']
})
export class ChatbotWidgetComponent implements OnInit {
  private translate = inject(TranslateService);

  isOpen = false;
  messages: ChatMessage[] = [];
  input = '';
  isLoading = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const saved = sessionStorage.getItem('chatbot_history');
    if (saved) {
      try {
        this.messages = JSON.parse(saved);
      } catch (e) {
        console.error('Lỗi load lịch sử chatbot', e);
      }
    }
  }

  private saveHistory() {
    sessionStorage.setItem('chatbot_history', JSON.stringify(this.messages));
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (!this.input.trim()) return;

    const userMessage = this.input.trim();
    this.messages.push({ role: 'user', text: userMessage });
    this.saveHistory();
    this.input = '';
    this.isLoading = true;

    // Use real API URL base path
    const apiUrl = `${API_URL}/chat`;

    this.http.post<any>(apiUrl, { message: userMessage }).subscribe({
      next: (response) => {
        const replyText = response?.data?.reply || response?.reply;
        const suggestions = response?.data?.suggestions || response?.suggestions || [];
        if (replyText) {
          this.messages.push({ role: 'ai', text: replyText, suggestions: suggestions });
        } else {
          this.messages.push({ role: 'ai', text: this.translate.instant('chatbot.emptyAnswer') });
        }
        this.saveHistory();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Lỗi kết nối chatbot:', error);
        this.messages.push({ role: 'ai', text: this.translate.instant('chatbot.error') });
        this.saveHistory();
        this.isLoading = false;
      }
    });
  }
}