import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container py-4">
      <!-- Checkout Steps -->
      <div class="checkout-steps d-flex align-items-center justify-content-center mb-5 max-w-75 mx-auto">
        <div class="step completed">
          <div class="step-number"><i class="fa-solid fa-check"></i></div>
          <span class="d-none d-md-inline">Cart</span>
        </div>
        <div class="step-divider completed"></div>
        <div class="step" [class.active]="step() === 1" [class.completed]="step() > 1">
          <div class="step-number">{{ step() > 1 ? '' : '2' }}<i *ngIf="step() > 1" class="fa-solid fa-check"></i></div>
          <span class="d-none d-md-inline">Shipping</span>
        </div>
        <div class="step-divider" [class.active]="step() >= 1" [class.completed]="step() > 2"></div>
        <div class="step" [class.active]="step() === 2" [class.completed]="step() > 2">
          <div class="step-number">{{ step() > 2 ? '' : '3' }}<i *ngIf="step() > 2" class="fa-solid fa-check"></i></div>
          <span class="d-none d-md-inline">Payment</span>
        </div>
      </div>

      <div class="row g-4">
        <!-- Main Checkout Area -->
        <div class="col-lg-8">
          @if (step() === 1) {
            <!-- Step 1: Shipping Info -->
            <div class="card border-0 shadow-sm fade-in">
              <div class="card-body p-4 p-md-5">
                <h4 class="fw-bold mb-4">Shipping Information</h4>
                
                <form (submit)="nextStep($event)">
                  <div class="row g-3">
                    <div class="col-sm-6">
                      <label class="form-label fw-semibold">First Name</label>
                      <input type="text" class="form-control bg-light border-0" required value="John">
                    </div>
                    <div class="col-sm-6">
                      <label class="form-label fw-semibold">Last Name</label>
                      <input type="text" class="form-control bg-light border-0" required value="Doe">
                    </div>
                    
                    <div class="col-12 mt-3">
                      <label class="form-label fw-semibold">Email Address</label>
                      <input type="email" class="form-control bg-light border-0" required value="john.doe@example.com">
                    </div>
                    
                    <div class="col-12 mt-3">
                      <label class="form-label fw-semibold">Street Address</label>
                      <input type="text" class="form-control bg-light border-0" required value="123 Tech Boulevard">
                    </div>
                    
                    <div class="col-sm-5 mt-3">
                      <label class="form-label fw-semibold">City</label>
                      <input type="text" class="form-control bg-light border-0" required value="San Francisco">
                    </div>
                    <div class="col-sm-4 mt-3">
                      <label class="form-label fw-semibold">State</label>
                      <select class="form-select bg-light border-0" required>
                        <option value="CA" selected>California</option>
                        <option value="NY">New York</option>
                        <option value="TX">Texas</option>
                      </select>
                    </div>
                    <div class="col-sm-3 mt-3">
                      <label class="form-label fw-semibold">Zip Code</label>
                      <input type="text" class="form-control bg-light border-0" required value="94105">
                    </div>
                  </div>
                  
                  <hr class="my-4">
                  
                  <div class="d-flex justify-content-between">
                    <a routerLink="/cart" class="btn btn-outline-secondary px-4">Back to Cart</a>
                    <button type="submit" class="btn btn-primary px-4 fw-bold">Continue to Payment</button>
                  </div>
                </form>
              </div>
            </div>
          } @else if (step() === 2) {
            <!-- Step 2: Payment -->
            <div class="card border-0 shadow-sm fade-in">
              <div class="card-body p-4 p-md-5">
                <h4 class="fw-bold mb-4">Payment Method</h4>
                
                <form (submit)="completeOrder($event)">
                  <!-- Payment Options -->
                  <div class="d-flex flex-column gap-3 mb-4">
                    <label class="border rounded-3 p-3 d-flex align-items-center gap-3 cursor-pointer" [class.border-primary]="paymentMethod === 'card'" [class.bg-light]="paymentMethod === 'card'">
                      <input type="radio" name="payment" class="form-check-input" [checked]="paymentMethod === 'card'" (change)="paymentMethod = 'card'">
                      <i class="fa-regular fa-credit-card fs-4 text-primary"></i>
                      <div class="flex-grow-1 fw-semibold">Credit or Debit Card</div>
                      <div class="d-flex gap-1">
                        <i class="fa-brands fa-cc-visa fs-5 text-muted"></i>
                        <i class="fa-brands fa-cc-mastercard fs-5 text-muted"></i>
                      </div>
                    </label>
                    
                    <label class="border rounded-3 p-3 d-flex align-items-center gap-3 cursor-pointer" [class.border-primary]="paymentMethod === 'paypal'" [class.bg-light]="paymentMethod === 'paypal'">
                      <input type="radio" name="payment" class="form-check-input" [checked]="paymentMethod === 'paypal'" (change)="paymentMethod = 'paypal'">
                      <i class="fa-brands fa-paypal fs-4 text-info"></i>
                      <div class="fw-semibold">PayPal</div>
                    </label>
                  </div>
                  
                  @if (paymentMethod === 'card') {
                    <div class="row g-3 mb-4 slide-up">
                      <div class="col-12">
                        <label class="form-label fw-semibold">Card Number</label>
                        <div class="input-group">
                          <span class="input-group-text bg-light border-0"><i class="fa-regular fa-credit-card"></i></span>
                          <input type="text" class="form-control bg-light border-0" placeholder="0000 0000 0000 0000" required>
                        </div>
                      </div>
                      <div class="col-6">
                        <label class="form-label fw-semibold">Expiry Date</label>
                        <input type="text" class="form-control bg-light border-0" placeholder="MM/YY" required>
                      </div>
                      <div class="col-6">
                        <label class="form-label fw-semibold">CVC</label>
                        <input type="text" class="form-control bg-light border-0" placeholder="123" required>
                      </div>
                    </div>
                  }
                  
                  <hr class="my-4">
                  
                  <div class="d-flex justify-content-between">
                    <button type="button" class="btn btn-outline-secondary px-4" (click)="step.set(1)">Back to Shipping</button>
                    <button type="submit" class="btn btn-success px-5 fw-bold" [disabled]="isProcessing">
                      @if (isProcessing) {
                        <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Processing...
                      } @else {
                        Pay \${{ cart.total() | number:'1.2-2' }}
                      }
                    </button>
                  </div>
                </form>
              </div>
            </div>
          } @else if (step() === 3) {
            <!-- Step 3: Success -->
            <div class="card border-0 shadow-sm fade-in text-center py-5">
              <div class="card-body">
                <div class="success-animation">
                  <div class="checkmark-circle">
                    <i class="fa-solid fa-check"></i>
                  </div>
                </div>
                
                <h2 class="fw-bold mb-3">Order Confirmed!</h2>
                <p class="text-muted mb-4 mx-auto" style="max-width: 400px;">
                  Thank you for your purchase. Your order #{{ orderNumber }} has been received and is being processed. 
                  We'll email you an order confirmation with details and tracking info.
                </p>
                
                <a routerLink="/" class="btn btn-primary px-4 fw-bold">Return to Home</a>
              </div>
            </div>
          }
        </div>

        <!-- Order Summary Sidebar -->
        <div class="col-lg-4">
          <div class="order-summary p-4 sticky-top" style="top: 100px;">
            <h5 class="fw-bold mb-3">In your cart</h5>
            
            <div class="d-flex flex-column gap-3 mb-4 max-h-50 overflow-auto pe-2">
              @for (item of cart.items(); track item.product.id) {
                <div class="d-flex gap-3">
                  <img [src]="item.product.image" [alt]="item.product.name" class="rounded border" style="width: 60px; height: 60px; object-fit: cover;">
                  <div>
                    <h6 class="mb-1 fw-bold fs-7">{{ item.product.name }}</h6>
                    <div class="d-flex justify-content-between align-items-center w-100">
                      <span class="text-muted small">Qty: {{ item.quantity }}</span>
                      <span class="fw-semibold">\${{ (item.product.price * item.quantity) | number:'1.2-2' }}</span>
                    </div>
                  </div>
                </div>
              }
            </div>
            
            <hr>
            
            <div class="summary-row">
              <span>Subtotal</span>
              <span class="fw-semibold">\${{ cart.subtotal() | number:'1.2-2' }}</span>
            </div>
            
            <div class="summary-row">
              <span>Shipping</span>
              <span>{{ cart.shipping() === 0 ? 'Free' : '\$' + (cart.shipping() | number:'1.2-2') }}</span>
            </div>
            
            <div class="summary-row">
              <span>Taxes</span>
              <span>\${{ cart.tax() | number:'1.2-2' }}</span>
            </div>
            
            <div class="summary-total d-flex justify-content-between align-items-center mt-3">
              <span>Total</span>
              <span class="fs-4 text-primary">\${{ cart.total() | number:'1.2-2' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CheckoutComponent {
  protected readonly cart = inject(CartService);
  private router = inject(Router);
  
  step = signal<number>(1);
  paymentMethod = 'card';
  isProcessing = false;
  orderNumber = '';

  constructor() {
    // If cart is empty, redirect to products
    if (this.cart.itemCount() === 0) {
      this.router.navigate(['/products']);
    }
  }

  nextStep(event: Event): void {
    event.preventDefault();
    this.step.set(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  completeOrder(event: Event): void {
    event.preventDefault();
    this.isProcessing = true;
    
    // Simulate API call
    setTimeout(() => {
      this.isProcessing = false;
      this.orderNumber = 'PHX-' + Math.floor(100000 + Math.random() * 900000);
      this.step.set(3);
      this.cart.clearCart();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  }
}
