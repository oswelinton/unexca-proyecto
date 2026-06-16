import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container py-4">
      <h2 class="fw-bolder mb-4">Shopping Cart</h2>

      @if (cart.itemCount() === 0) {
        <div class="text-center py-5 bg-light rounded-3 mt-4">
          <i class="fa-solid fa-cart-arrow-down fs-1 text-muted mb-3"></i>
          <h4 class="fw-bold">Your cart is empty</h4>
          <p class="text-muted mb-4">Looks like you haven't added any items to your cart yet.</p>
          <a routerLink="/products" class="btn btn-primary px-4">Start Shopping</a>
        </div>
      } @else {
        <div class="row g-4">
          <!-- Cart Items -->
          <div class="col-lg-8">
            <div class="card border-0 shadow-sm">
              <div class="card-body p-0">
                <div class="table-responsive">
                  <table class="table align-middle mb-0">
                    <thead class="bg-light text-muted">
                      <tr>
                        <th scope="col" class="ps-4 py-3 fw-semibold border-0">Product</th>
                        <th scope="col" class="py-3 fw-semibold border-0">Price</th>
                        <th scope="col" class="py-3 fw-semibold border-0">Quantity</th>
                        <th scope="col" class="pe-4 py-3 fw-semibold border-0 text-end">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      @for (item of cart.items(); track item.product.id) {
                        <tr class="cart-item">
                          <td class="ps-4">
                            <div class="d-flex align-items-center gap-3">
                              <button 
                                class="btn text-danger p-0 border-0" 
                                (click)="cart.removeFromCart(item.product.id)"
                                title="Remove item"
                              >
                                <i class="fa-solid fa-trash-can"></i>
                              </button>
                              <a [routerLink]="['/product', item.product.id]">
                                <img [src]="item.product.image" [alt]="item.product.name" class="cart-item-img">
                              </a>
                              <div>
                                <a [routerLink]="['/product', item.product.id]" class="text-decoration-none text-dark fw-bold d-block mb-1">
                                  {{ item.product.name }}
                                </a>
                                <span class="badge bg-light text-secondary border">{{ item.product.category }}</span>
                              </div>
                            </div>
                          </td>
                          <td class="fw-semibold">
                            \${{ item.product.price | number:'1.2-2' }}
                          </td>
                          <td>
                            <div class="quantity-selector">
                              <button class="btn-qty" (click)="cart.updateQuantity(item.product.id, item.quantity - 1)">-</button>
                              <input type="number" class="qty-value" [value]="item.quantity" readonly>
                              <button class="btn-qty" (click)="cart.updateQuantity(item.product.id, item.quantity + 1)">+</button>
                            </div>
                          </td>
                          <td class="pe-4 text-end fw-bold">
                            \${{ (item.product.price * item.quantity) | number:'1.2-2' }}
                          </td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="card-footer bg-white border-top-0 p-4 d-flex justify-content-between align-items-center">
                <a routerLink="/products" class="text-decoration-none fw-semibold">
                  <i class="fa-solid fa-arrow-left me-2"></i> Continue Shopping
                </a>
                <button class="btn btn-outline-danger btn-sm" (click)="cart.clearCart()">
                  Clear Cart
                </button>
              </div>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="col-lg-4">
            <div class="order-summary p-4 sticky-top" style="top: 100px;">
              <h5 class="fw-bold mb-4">Order Summary</h5>
              
              <div class="summary-row">
                <span>Subtotal ({{ cart.itemCount() }} items)</span>
                <span class="fw-semibold">\${{ cart.subtotal() | number:'1.2-2' }}</span>
              </div>
              
              <div class="summary-row">
                <span>Shipping</span>
                <span>{{ cart.shipping() === 0 ? 'Free' : '\$' + (cart.shipping() | number:'1.2-2') }}</span>
              </div>
              
              <div class="summary-row">
                <span>Estimated Tax</span>
                <span>\${{ cart.tax() | number:'1.2-2' }}</span>
              </div>
              
              @if (cart.savings() > 0) {
                <div class="summary-row text-success mt-2">
                  <span>Total Savings</span>
                  <span class="fw-semibold">-\${{ cart.savings() | number:'1.2-2' }}</span>
                </div>
              }
              
              <div class="summary-total d-flex justify-content-between align-items-center">
                <span>Total</span>
                <span class="fs-4">\${{ cart.total() | number:'1.2-2' }}</span>
              </div>
              
              <a routerLink="/checkout" class="btn btn-primary w-100 mt-4 py-2 fw-bold text-uppercase">
                Proceed to Checkout <i class="fa-solid fa-lock ms-2"></i>
              </a>
              
              <div class="text-center mt-3 text-muted small">
                <i class="fa-solid fa-shield-halved me-1"></i> Secure Checkout Guaranteed
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class CartComponent {
  protected readonly cart = inject(CartService);
}
