import { Component, inject, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <!-- Topbar -->
    <section class="py-0">
      <div class="container-small">
        <div class="ecommerce-topbar">
          <nav class="navbar navbar-expand-lg navbar-light px-0">
            <div class="row gx-0 gy-2 w-100 flex-between-center">
              <div class="col-auto">
                <a class="text-decoration-none" routerLink="/">
                  <div class="d-flex align-items-center">
                    <img src="assets/img/icons/logo.png" alt="phoenix" width="27" />
                    <h5 class="logo-text ms-2">phoenix</h5>
                  </div>
                </a>
              </div>
              <div class="col-auto order-md-1">
                <ul class="navbar-nav navbar-nav-icons flex-row me-n2">
                  <li class="nav-item d-flex align-items-center">
                    <div class="theme-control-toggle feather-icon-wait px-2">
                      <input class="form-check-input ms-0 theme-control-toggle-input" type="checkbox" data-theme-control="phoenixTheme" value="dark" id="themeControlToggle" (change)="toggleTheme($event)" />
                      <label class="mb-0 theme-control-toggle-label theme-control-toggle-light" for="themeControlToggle" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Switch theme" style="height:32px;width:32px;"><span class="icon" data-feather="moon"></span></label>
                      <label class="mb-0 theme-control-toggle-label theme-control-toggle-dark" for="themeControlToggle" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Switch theme" style="height:32px;width:32px;"><span class="icon" data-feather="sun"></span></label>
                    </div>
                  </li>
                  <li class="nav-item feather-icon-wait" style="height: 40px;">
                    <a class="nav-link px-2 icon-indicator icon-indicator-primary" routerLink="/cart" role="button">
                      <span class="text-body-tertiary" data-feather="shopping-cart" style="height:20px;width:20px;"></span>
                      <span class="icon-indicator-number">{{ cart.itemCount() }}</span>
                    </a>
                  </li>
                  <li class="nav-item dropdown feather-icon-wait" style="height: 40px;">
                    <a class="nav-link px-2 icon-indicator icon-indicator-sm icon-indicator-danger" id="navbarTopDropdownNotification" href="#" role="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false">
                      <span class="text-body-tertiary" data-feather="bell" style="height:20px;width:20px;"></span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-end notification-dropdown-menu py-0 shadow border navbar-dropdown-caret mt-2" id="navbarDropdownNotfication" aria-labelledby="navbarDropdownNotfication">
                      <div class="card position-relative border-0">
                        <div class="card-header p-2">
                          <div class="d-flex justify-content-between">
                            <h5 class="text-body-emphasis mb-0">Notifications</h5>
                            <button class="btn btn-link p-0 fs-9 fw-normal" type="button">Mark all as read</button>
                          </div>
                        </div>
                        <div class="card-body p-0">
                          <div class="scrollbar-overlay" style="height: 10rem;">
                            <div class="p-4 text-center text-muted">No new notifications</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="nav-item dropdown feather-icon-wait" style="height: 40px;">
                    <a class="nav-link px-2" id="navbarDropdownUser" href="#" role="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false">
                      <span class="text-body-tertiary" data-feather="user" style="height:20px;width:20px;"></span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-end navbar-dropdown-caret py-0 dropdown-profile shadow border mt-2" aria-labelledby="navbarDropdownUser">
                      <div class="card position-relative border-0">
                        <div class="card-body p-0">
                          <div class="text-center pt-4 pb-3">
                            <div class="avatar avatar-xl">
                              <img class="rounded-circle" src="assets/img/team/72x72/57.webp" alt="" />
                            </div>
                            <h6 class="mt-2 text-body-emphasis">Jerry Seinfield</h6>
                          </div>
                        </div>
                        <div class="card-footer p-0 border-top border-translucent">
                          <div class="px-3 py-2"><a class="btn btn-phoenix-secondary d-flex flex-center w-100" href="#!"><span class="me-2" data-feather="log-out"></span>Sign out</a></div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="col-12 col-md-6">
                <div class="search-box ecommerce-search-box w-100">
                  <form class="position-relative">
                    <input class="form-control search-input search form-control-sm" type="search" placeholder="Search" aria-label="Search" />
                    <span class="fas fa-search search-box-icon"></span>
                  </form>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </section>

    <!-- Categories Navbar -->
    <nav class="navbar-responsive-navitems navbar-expand navbar-light bg-body-emphasis justify-content-between">
      <div class="container-small d-flex flex-between-center" data-navbar="data-navbar">
        <div class="dropdown feather-icon-wait">
          <button class="btn text-body ps-0 pe-5 text-nowrap dropdown-toggle dropdown-caret-none" data-category-btn="data-category-btn" data-bs-toggle="dropdown">
            <span class="fas fa-bars me-2"></span>Category
          </button>
          <div class="dropdown-menu border border-translucent py-0 category-dropdown-menu">
            <div class="card border-0 scrollbar" style="max-height: 657px;">
              <div class="card-body p-6 pb-3">
                <div class="row gx-7 gy-5 mb-5">
                  <div class="col-12 col-sm-6 col-md-4">
                    <div class="d-flex align-items-center mb-3"><span class="text-primary me-2" data-feather="monitor" style="stroke-width:3;"></span>
                      <h6 class="text-body-highlight mb-0 text-nowrap">Electronics</h6>
                    </div>
                    <div class="ms-n2">
                      <a class="text-body-emphasis d-block mb-1 text-decoration-none bg-body-highlight-hover px-2 py-1 rounded-2" routerLink="/products" [queryParams]="{category: 'Electronics'}">Computers &amp; Tablets</a>
                    </div>
                  </div>
                  <!-- Other categories can be added similarly -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul class="navbar-nav justify-content-end align-items-center">
          <li class="nav-item invisible" data-nav-item="data-nav-item"><a class="nav-link ps-0" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Home</a></li>
          <li class="nav-item invisible" data-nav-item="data-nav-item"><a class="nav-link" routerLink="/products" routerLinkActive="active">Products</a></li>
          <li class="nav-item invisible" data-nav-item="data-nav-item"><a class="nav-link" routerLink="/cart" routerLinkActive="active">Cart</a></li>
          <li class="nav-item invisible" data-nav-item="data-nav-item"><a class="nav-link pe-0" routerLink="/checkout" routerLinkActive="active">Checkout</a></li>
        </ul>
      </div>
    </nav>
  `
})
export class NavbarComponent implements AfterViewInit {
  protected readonly cart = inject(CartService);

  ngAfterViewInit() {
    if (typeof (window as any).feather !== 'undefined') {
      (window as any).feather.replace();
    }
    
    // Phoenix hides icons with this class until they are ready. 
    // We must remove it manually after rendering.
    document.querySelectorAll('.feather-icon-wait').forEach(el => {
      el.classList.remove('feather-icon-wait');
    });
    
    // Set initial theme state on the checkbox based on the config.js loaded theme
    setTimeout(() => {
      const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
      const checkbox = document.getElementById('themeControlToggle') as HTMLInputElement;
      if (checkbox) checkbox.checked = isDark;
    });
  }

  toggleTheme(event: any) {
    const isDark = event.target.checked;
    const theme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('phoenixTheme', theme);
  }
}
