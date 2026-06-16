import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems = signal<CartItem[]>([]);

  readonly items = this.cartItems.asReadonly();

  readonly itemCount = computed(() =>
    this.cartItems().reduce((total, item) => total + item.quantity, 0)
  );

  readonly subtotal = computed(() =>
    this.cartItems().reduce((total, item) => total + item.product.price * item.quantity, 0)
  );

  readonly tax = computed(() => this.subtotal() * 0.08);

  readonly shipping = computed(() => (this.subtotal() > 500 ? 0 : 9.99));

  readonly total = computed(() => this.subtotal() + this.tax() + this.shipping());

  readonly savings = computed(() =>
    this.cartItems().reduce(
      (total, item) =>
        total + (item.product.originalPrice - item.product.price) * item.quantity,
      0
    )
  );

  addToCart(product: Product, quantity = 1): void {
    const current = this.cartItems();
    const existingIndex = current.findIndex((item) => item.product.id === product.id);

    if (existingIndex >= 0) {
      const updated = [...current];
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: updated[existingIndex].quantity + quantity,
      };
      this.cartItems.set(updated);
    } else {
      this.cartItems.set([...current, { product, quantity }]);
    }
  }

  removeFromCart(productId: number): void {
    this.cartItems.set(this.cartItems().filter((item) => item.product.id !== productId));
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    const updated = this.cartItems().map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    this.cartItems.set(updated);
  }

  clearCart(): void {
    this.cartItems.set([]);
  }

  isInCart(productId: number): boolean {
    return this.cartItems().some((item) => item.product.id === productId);
  }
}
