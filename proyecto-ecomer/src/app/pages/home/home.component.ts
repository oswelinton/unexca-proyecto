import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="ecommerce-homepage pt-5 mb-9">
      <!-- Deals Icons Section -->
      <section class="py-0">
        <div class="container-small">
          <div class="scrollbar">
            <div class="d-flex justify-content-between">
              <a class="icon-nav-item" href="#!">
                <div class="icon-container mb-2 bg-warning-subtle" data-bs-theme="light">
                  <span class="fs-4 uil uil-star text-warning"></span>
                </div>
                <p class="nav-label">Deals</p>
              </a>
              <a class="icon-nav-item" href="#!">
                <div class="icon-container mb-2"><span class="fs-4 uil uil-shopping-bag"></span></div>
                <p class="nav-label">Grocery</p>
              </a>
              <a class="icon-nav-item" href="#!">
                <div class="icon-container mb-2"><span class="fs-4 uil uil-watch-alt"></span></div>
                <p class="nav-label">Fashion</p>
              </a>
              <a class="icon-nav-item" href="#!">
                <div class="icon-container mb-2"><span class="fs-4 uil uil-mobile-android"></span></div>
                <p class="nav-label">Mobile</p>
              </a>
              <a class="icon-nav-item" href="#!">
                <div class="icon-container mb-2"><span class="fs-4 uil uil-monitor"></span></div>
                <p class="nav-label">Electronics</p>
              </a>
              <a class="icon-nav-item" href="#!">
                <div class="icon-container mb-2"><span class="fs-4 uil uil-estate"></span></div>
                <p class="nav-label">Home</p>
              </a>
              <a class="icon-nav-item" href="#!">
                <div class="icon-container mb-2"><span class="fs-4 uil uil-lamp"></span></div>
                <p class="nav-label">Dining</p>
              </a>
              <a class="icon-nav-item" href="#!">
                <div class="icon-container mb-2"><span class="fs-4 uil uil-gift"></span></div>
                <p class="nav-label">Gifts</p>
              </a>
              <a class="icon-nav-item" href="#!">
                <div class="icon-container mb-2"><span class="fs-4 uil uil-wrench"></span></div>
                <p class="nav-label">Tools</p>
              </a>
              <a class="icon-nav-item" href="#!">
                <div class="icon-container mb-2"><span class="fs-4 uil uil-plane-departure"></span></div>
                <p class="nav-label">Travel</p>
              </a>
              <a class="icon-nav-item" href="#!">
                <div class="icon-container mb-2"><span class="fs-4 uil uil-palette"></span></div>
                <p class="nav-label">Others</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Banners Section -->
      <section class="py-0 px-xl-3 mt-5">
        <div class="container px-xl-0 px-xxl-3">
          <div class="row g-3 mb-9">
            <div class="col-12">
              <div class="whooping-banner w-100 rounded-3 overflow-hidden">
                <div class="bg-holder z-n1 product-bg" style="background-image:url(assets/img/e-commerce/whooping_banner_product.png);background-position: bottom right;"></div>
                <div class="bg-holder z-n1 shape-bg" style="background-image:url(assets/img/e-commerce/whooping_banner_shape_2.png);background-position: bottom left;"></div>
                <div class="banner-text" data-bs-theme="light">
                  <h2 class="text-warning-light fw-bolder fs-lg-3 fs-xxl-2">Whooping <span class="gradient-text">60% </span>Off</h2>
                  <h3 class="fw-bolder fs-lg-5 fs-xxl-3 text-white">on everyday items</h3>
                </div>
                <a class="btn btn-lg btn-primary rounded-pill banner-button" routerLink="/products">Shop Now</a>
              </div>
            </div>
            
            <div class="col-12 col-xl-6">
              <div class="gift-items-banner w-100 rounded-3 overflow-hidden">
                <div class="bg-holder z-n1 banner-bg" style="background-image:url(assets/img/e-commerce/gift-items-banner-bg.png);"></div>
                <div class="banner-text text-md-center">
                  <h2 class="text-white fw-bolder fs-xl-4">Get <span class="gradient-text">10% Off </span><br class="d-md-none"> on gift items</h2>
                  <a class="btn btn-lg btn-primary rounded-pill banner-button" routerLink="/products">Buy Now</a>
                </div>
              </div>
            </div>
            
            <div class="col-12 col-xl-6">
              <div class="best-in-market-banner d-flex h-100 px-4 px-sm-7 py-5 px-md-11 rounded-3 overflow-hidden">
                <div class="bg-holder z-n1 banner-bg" style="background-image:url(assets/img/e-commerce/best-in-market-bg.png);"></div>
                <div class="row align-items-center w-sm-100">
                  <div class="col-8">
                    <div class="banner-text">
                      <h2 class="text-white fw-bolder fs-sm-4 mb-5">MI 11 Pro<br><span class="fs-7 fs-sm-6"> Best in the market</span></h2>
                      <a class="btn btn-lg btn-warning rounded-pill banner-button" routerLink="/product/3">Buy Now</a>
                    </div>
                  </div>
                  <div class="col-4">
                    <img class="w-100 w-sm-75" src="assets/img/e-commerce/5.png" alt="">
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Sample Grid to replace Angular mock -->
          <div class="row g-4 mb-6">
             <div class="col-12 text-center mt-4">
                <a class="btn btn-outline-primary rounded-pill px-5" routerLink="/products">Ver Todos los Productos de Demo</a>
             </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class HomeComponent {}
