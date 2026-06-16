import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toasts = signal<Toast[]>([]);
  private nextId = 0;

  readonly activeToasts = this.toasts.asReadonly();

  show(message: string, type: 'success' | 'error' | 'info' = 'success'): void {
    const id = this.nextId++;
    this.toasts.set([...this.toasts(), { id, message, type }]);
    setTimeout(() => this.dismiss(id), 3000);
  }

  dismiss(id: number): void {
    this.toasts.set(this.toasts().filter((t) => t.id !== id));
  }
}
