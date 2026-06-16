import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../data/products';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="product-card-container h-100">
      <div class="position-relative text-decoration-none product-card h-100">
        <div class="d-flex flex-column justify-content-between h-100">
          <div>
            <div class="border border-1 border-translucent rounded-3 position-relative mb-3">
              <button class="btn btn-wish btn-wish-primary z-2 d-toggle-container" 
                      [class.active]="isWishlisted"
                      (click)="toggleWishlist($event)"
                      data-bs-toggle="tooltip" data-bs-placement="top" title="Add to wishlist">
                <span class="fas fa-heart d-block-hover" data-fa-transform="down-1"></span>
                <span class="far fa-heart d-none-hover" data-fa-transform="down-1"></span>
              </button>
              <img class="img-fluid" [src]="product.image" [alt]="product.name" style="width: 100%; object-fit: cover;" />
              @if (product.badge) {
                <span class="badge text-bg-success fs-10 product-verified-badge">{{ product.badge }}</span>
              }
            </div>
            <a class="stretched-link" [routerLink]="['/product', product.id]">
              <h6 class="mb-2 lh-sm line-clamp-3 product-name">{{ product.name }}</h6>
            </a>
            <p class="fs-9">
              <span class="fa fa-star text-warning"></span>
              <span class="fa fa-star text-warning"></span>
              <span class="fa fa-star text-warning"></span>
              <span class="fa fa-star text-warning"></span>
              <span class="fa fa-star text-warning"></span>
              <span class="text-body-quaternary fw-semibold ms-1">({{ product.reviewCount }} people rated)</span>
            </p>
          </div>
          <div>
            <p class="fs-9 text-body-tertiary mb-2">{{ product.category }}</p>
            <div class="d-flex align-items-center mb-1">
              @if (product.originalPrice > product.price) {
                <p class="me-2 text-body text-decoration-line-through mb-0">\${{ product.originalPrice | number:'1.2-2' }}</p>
              }
              <h3 class="text-body-emphasis mb-0">\${{ product.price | number:'1.2-2' }}</h3>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <p class="text-body-tertiary fw-semibold fs-9 lh-1 mb-0">In stock: {{ product.inStock }}</p>
              <button class="btn btn-sm btn-phoenix-primary position-relative z-index-1" (click)="addToCart(); $event.stopPropagation(); $event.preventDefault();" style="z-index: 5;">
                <span class="fas fa-cart-plus"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  
  private cartService = inject(CartService);
  private toastService = inject(ToastService);
  
  isWishlisted = false;
  
  toggleWishlist(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.isWishlisted = !this.isWishlisted;
    
    if (this.isWishlisted) {
      this.toastService.show('Added to wishlist', 'success');
    } else {
      this.toastService.show('Removed from wishlist', 'info');
    }
  }
  
  addToCart(): void {
    this.cartService.addToCart(this.product);
    this.toastService.show('Added to cart successfully', 'success');
  }
}
