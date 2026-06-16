import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PRODUCTS, Product } from '../../data/products';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    @if (product) {
      <div class="pt-5 pb-9">
        <section class="py-0">
          <div class="container-small">
            <nav class="mb-3" aria-label="breadcrumb">
              <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item"><a routerLink="/">Home</a></li>
                <li class="breadcrumb-item"><a routerLink="/products" [queryParams]="{category: product.category}">{{ product.category }}</a></li>
                <li class="breadcrumb-item active" aria-current="page">{{ product.name }}</li>
              </ol>
            </nav>
            <div class="row g-5 mb-5 mb-lg-8" data-product-details="data-product-details">
              <!-- Product Images -->
              <div class="col-12 col-lg-6">
                <div class="row g-3 mb-3">
                  <div class="col-12 col-md-2 col-lg-12 col-xl-2">
                    <div class="d-flex flex-md-column flex-lg-row flex-xl-column gap-2 overflow-auto" style="max-height: 400px;">
                      @if (product.images.length > 1) {
                        @for (img of product.images; track img) {
                          <div class="border border-translucent rounded-3 p-2 cursor-pointer" [class.bg-light]="activeImage === img" (click)="activeImage = img">
                            <img [src]="img" class="img-fluid" [alt]="product.name">
                          </div>
                        }
                      }
                    </div>
                  </div>
                  <div class="col-12 col-md-10 col-lg-12 col-xl-10">
                    <div class="d-flex align-items-center border border-translucent rounded-3 text-center p-5 h-100">
                      <img [src]="activeImage" [alt]="product.name" class="img-fluid w-100" style="object-fit: contain;">
                    </div>
                  </div>
                </div>
                <div class="d-flex">
                  <button class="btn btn-lg btn-outline-warning rounded-pill w-100 me-3 px-2 px-sm-4 fs-9 fs-sm-8"><span class="me-2 far fa-heart"></span>Add to wishlist</button>
                  <button class="btn btn-lg btn-warning rounded-pill w-100 fs-9 fs-sm-8" [disabled]="!product.inStock" (click)="addToCart()"><span class="fas fa-shopping-cart me-2"></span>Add to cart</button>
                </div>
              </div>

              <!-- Product Info -->
              <div class="col-12 col-lg-6">
                <div class="d-flex flex-column justify-content-between h-100">
                  <div>
                    <div class="d-flex flex-wrap mb-2">
                      <div class="me-2">
                        <span class="fa fa-star text-warning"></span>
                        <span class="fa fa-star text-warning"></span>
                        <span class="fa fa-star text-warning"></span>
                        <span class="fa fa-star text-warning"></span>
                        <span class="fa fa-star text-warning"></span>
                      </div>
                      <p class="text-primary fw-semibold mb-2">{{ product.reviewCount }} People rated and reviewed </p>
                    </div>
                    <h3 class="mb-3 lh-sm">{{ product.name }}</h3>
                    <div class="d-flex flex-wrap align-items-start mb-3">
                      <span class="badge text-bg-success fs-9 rounded-pill me-2 fw-semibold">{{ product.category }}</span>
                      @if (product.badge) {
                        <span class="badge text-bg-danger fs-9 rounded-pill me-2 fw-semibold">{{ product.badge }}</span>
                      }
                    </div>
                    <div class="d-flex flex-wrap align-items-center">
                      <h1 class="me-3">\${{ product.price | number:'1.2-2' }}</h1>
                      @if (product.originalPrice > product.price) {
                        <p class="text-body-quaternary text-decoration-line-through fs-6 mb-0 me-3">\${{ product.originalPrice | number:'1.2-2' }}</p>
                        <p class="text-warning fw-bolder fs-6 mb-0">Save \${{ (product.originalPrice - product.price) | number:'1.0-0' }}</p>
                      }
                    </div>
                    
                    @if (product.inStock) {
                      <p class="text-success fw-semibold fs-7 mb-2">In stock</p>
                    } @else {
                      <p class="text-danger fw-semibold fs-7 mb-2">Out of stock</p>
                    }
                    
                    <p class="mb-2 text-body-secondary">{{ product.description }}</p>
                  </div>
                  
                  <div>
                    @if (product.colors && product.colors.length > 0) {
                      <div class="mb-3 mt-4">
                        <p class="fw-semibold mb-2 text-body">Color : </p>
                        <div class="d-flex product-color-variants">
                          @for (color of product.colors; track color; let idx = $index) {
                            <div class="rounded-1 border border-translucent me-2 p-1 cursor-pointer" 
                                 [class.border-primary]="activeColor === idx"
                                 (click)="activeColor = idx">
                              <div class="rounded-1" [style.background-color]="color" style="width: 32px; height: 32px;"></div>
                            </div>
                          }
                        </div>
                      </div>
                    }
                    
                    <div class="row g-3 g-sm-5 align-items-end mt-2">
                      <div class="col-12 col-sm">
                        <p class="fw-semibold mb-2 text-body">Quantity : </p>
                        <div class="d-flex justify-content-between align-items-end">
                          <div class="d-flex flex-between-center">
                            <button class="btn btn-phoenix-primary px-3" (click)="decreaseQty()"><span class="fas fa-minus"></span></button>
                            <input class="form-control text-center bg-transparent border-0 outline-none" style="width:50px;" type="number" min="1" [value]="quantity" readonly />
                            <button class="btn btn-phoenix-primary px-3" (click)="increaseQty()"><span class="fas fa-plus"></span></button>
                          </div>
                          <button class="btn btn-phoenix-primary px-3 border-0"><span class="fas fa-share-alt fs-7"></span></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Specs -->
        <div class="mt-5">
          <ul class="nav nav-tabs mb-4" id="productTabs" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active fw-bold text-dark px-4" id="specs-tab" data-bs-toggle="tab" data-bs-target="#specs" type="button" role="tab">
                Specifications
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link fw-bold text-muted px-4" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#reviews" type="button" role="tab">
                Reviews
              </button>
            </li>
          </ul>
          <div class="tab-content" id="productTabsContent">
            <div class="tab-pane fade show active" id="specs" role="tabpanel" tabindex="0">
              <div class="row">
                <div class="col-md-8 col-lg-6">
                  <table class="table table-borderless table-striped">
                    <tbody>
                      @for (spec of product.specs; track spec.label) {
                        <tr>
                          <th scope="row" class="text-muted w-25">{{ spec.label }}</th>
                          <td class="fw-semibold">{{ spec.value }}</td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="tab-pane fade text-muted py-4" id="reviews" role="tabpanel" tabindex="0">
              <i class="fa-regular fa-comment-dots fs-3 mb-2"></i>
              <p>Reviews will appear here.</p>
            </div>
          </div>
        </div>
      </div>
    } @else {
      <div class="container py-5 text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    }
  `
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  activeImage = '';
  activeColor = 0;
  quantity = 1;
  
  private cartService = inject(CartService);
  private toastService = inject(ToastService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.product = PRODUCTS.find(p => p.id === id);
      if (this.product) {
        this.activeImage = this.product.image;
        this.quantity = 1;
      }
    });
  }

  increaseQty(): void {
    if (this.quantity < 10) {
      this.quantity++;
    }
  }

  decreaseQty(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);
      this.toastService.show(`Added ${this.quantity} item(s) to cart`, 'success');
    }
  }
}
