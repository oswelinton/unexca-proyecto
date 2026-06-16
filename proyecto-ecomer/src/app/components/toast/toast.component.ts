import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  template: `
    <div class="toast-container position-fixed top-0 end-0 p-3">
      @for (toast of toastService.activeToasts(); track toast.id) {
        <div
          class="toast show fade-in"
          role="alert"
          [class.border-success]="toast.type === 'success'"
          [class.border-danger]="toast.type === 'error'"
          [class.border-info]="toast.type === 'info'"
        >
          <div class="toast-body d-flex align-items-center gap-2 py-2 px-3">
            @if (toast.type === 'success') {
              <i class="fa-solid fa-circle-check text-success"></i>
            } @else if (toast.type === 'error') {
              <i class="fa-solid fa-circle-xmark text-danger"></i>
            } @else {
              <i class="fa-solid fa-circle-info text-info"></i>
            }
            <span class="fw-semibold small">{{ toast.message }}</span>
            <button
              type="button"
              class="btn-close ms-auto"
              style="font-size: 0.6rem"
              (click)="toastService.dismiss(toast.id)"
            ></button>
          </div>
        </div>
      }
    </div>
  `,
})
export class ToastComponent {
  protected readonly toastService = inject(ToastService);
}
