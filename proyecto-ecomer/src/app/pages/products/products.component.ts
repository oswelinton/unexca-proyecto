import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { PRODUCTS, CATEGORIES, Product } from '../../data/products';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `
    <div class="container py-4">
      <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/" class="text-decoration-none text-muted">Home</a></li>
          <li class="breadcrumb-item active" aria-current="page">Products</li>
        </ol>
      </nav>

      <div class="row g-4">
        <!-- Sidebar Filter -->
        <div class="col-lg-3">
          <div class="card border-0 shadow-sm">
            <div class="card-body">
              <h5 class="fw-bold mb-4">Filters</h5>
              
              <div class="mb-4">
                <h6 class="fw-bold mb-3">Categories</h6>
                <div class="d-flex flex-column gap-2">
                  <div class="form-check custom-checkbox">
                    <input class="form-check-input" type="radio" name="category" id="cat-all" 
                           [checked]="!activeCategory" (change)="filterByCategory('')">
                    <label class="form-check-label" for="cat-all">All Products</label>
                  </div>
                  @for (cat of categories; track cat.name) {
                    <div class="form-check custom-checkbox">
                      <input class="form-check-input" type="radio" name="category" [id]="'cat-' + cat.name"
                             [checked]="activeCategory === cat.name" (change)="filterByCategory(cat.name)">
                      <label class="form-check-label d-flex justify-content-between w-100" [for]="'cat-' + cat.name">
                        {{ cat.name }} <span class="text-muted small">({{ cat.count }})</span>
                      </label>
                    </div>
                  }
                </div>
              </div>
              
              <div class="mb-4">
                <h6 class="fw-bold mb-3">Price Range</h6>
                <input type="range" class="form-range" min="0" max="3000" step="100" id="priceRange">
                <div class="d-flex justify-content-between text-muted small mt-2">
                  <span>$0</span>
                  <span>$3,000+</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Product Grid -->
        <div class="col-lg-9 col-xxl-10">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h4 class="mb-0 fw-bold">{{ activeCategory ? activeCategory : 'All Products' }}</h4>
            <div class="d-flex align-items-center gap-2">
              <span class="text-muted small text-nowrap">Sort by:</span>
              <select class="form-select form-select-sm border-0 bg-light fw-semibold" style="width: 150px;">
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest Arrivals</option>
              </select>
            </div>
          </div>

          @if (filteredProducts.length === 0) {
            <div class="text-center py-5">
              <i class="fa-solid fa-box-open fs-1 text-muted mb-3"></i>
              <h5>No products found</h5>
              <p class="text-muted">Try adjusting your filters to find what you're looking for.</p>
            </div>
          } @else {
            <div class="row gx-3 gy-6 mb-8">
              @for (product of filteredProducts; track product.id) {
                <div class="col-12 col-sm-6 col-md-4 col-xxl-2">
                  <app-product-card [product]="product"></app-product-card>
                </div>
              }
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class ProductsComponent implements OnInit {
  categories = CATEGORIES;
  allProducts = PRODUCTS;
  filteredProducts: Product[] = [];
  activeCategory = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.activeCategory = params['category'] || '';
      this.applyFilters();
    });
  }

  filterByCategory(category: string): void {
    this.activeCategory = category;
    this.applyFilters();
  }

  private applyFilters(): void {
    if (this.activeCategory) {
      this.filteredProducts = this.allProducts.filter(p => p.category === this.activeCategory);
    } else {
      this.filteredProducts = [...this.allProducts];
    }
  }
}
