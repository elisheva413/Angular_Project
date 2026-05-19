import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductModel } from '../Models/Products-Model';
import { CartItem, SavedItem } from '../Models/Cart-Model';

@Injectable({ providedIn: 'root' })
export class CartService {
  
  private cartSubject = new BehaviorSubject<CartItem[]>(this.loadCart());
  cart$ = this.cartSubject.asObservable();

  private savedSubject = new BehaviorSubject<SavedItem[]>(this.loadSaved());
  saved$ = this.savedSubject.asObservable();

  addToCart(product: ProductModel, qty: number = 1) {
    let currentCart = this.cartSubject.value;
    const existingItem = currentCart.find(item => item.product.productsId === product.productsId);
    
    const currentQtyInCart = existingItem ? existingItem.selectedQuantity : 0;
    const totalRequested = currentQtyInCart + qty;

    if (totalRequested > product.quantity) {
      alert(`מצטערים, המלאי מוגבל ל-${product.quantity} יחידות`);
      return;
    }

    if (existingItem) {
      existingItem.selectedQuantity = totalRequested;
    } else {
      currentCart.push({ product, selectedQuantity: qty, included: true });
    }

    this.saveAndRefresh(currentCart);
  }

  updateQuantity(productId: number, newQty: number) {
    let currentCart = this.cartSubject.value;
    const item = currentCart.find(i => i.product.productsId === productId);
    
    if (item) {
      if (newQty <= 0) {
        this.removeItem(productId);
        return;
      }
      if (newQty > item.product.quantity) {
        alert(`ניתן להזמין עד ${item.product.quantity} יחידות`);
        item.selectedQuantity = item.product.quantity;
      } else {
        item.selectedQuantity = newQty;
      }
      this.saveAndRefresh(currentCart);
    }
  }

  removeItem(productId: number) {
    const updatedCart = this.cartSubject.value.filter(item => item.product.productsId !== productId);
    this.saveAndRefresh(updatedCart);
  }

  saveForLater(productId: number) {
    const currentCart = this.cartSubject.value;
    const item = currentCart.find(i => i.product.productsId === productId);
    if (!item) return;

    const updatedCart = currentCart.filter(i => i.product.productsId !== productId);
    this.saveAndRefresh(updatedCart);

    const currentSaved = this.savedSubject.value;
    if (!currentSaved.find(s => s.product.productsId === productId)) {
      const updatedSaved = [...currentSaved, { product: item.product }];
      localStorage.setItem('p_saved', JSON.stringify(updatedSaved));
      this.savedSubject.next(updatedSaved);
    }
  }

  moveToCart(productId: number) {
    const currentSaved = this.savedSubject.value;
    const item = currentSaved.find(s => s.product.productsId === productId);
    if (!item) return;

    const updatedSaved = currentSaved.filter(s => s.product.productsId !== productId);
    localStorage.setItem('p_saved', JSON.stringify(updatedSaved));
    this.savedSubject.next(updatedSaved);

    this.addToCart(item.product, 1);
  }

  removeSaved(productId: number) {
    const updatedSaved = this.savedSubject.value.filter(s => s.product.productsId !== productId);
    localStorage.setItem('p_saved', JSON.stringify(updatedSaved));
    this.savedSubject.next(updatedSaved);
  }

  toggleIncluded(productId: number) {
    const currentCart = this.cartSubject.value;
    const item = currentCart.find(i => i.product.productsId === productId);
    if (item) {
      item.included = !item.included;
      this.saveAndRefresh(currentCart);
    }
  }

  getTotalPrice(): number {
    return this.cartSubject.value
      .filter(i => i.included)
      .reduce((total, item) => total + (item.product.price * item.selectedQuantity), 0);
  }

  private saveAndRefresh(cart: CartItem[]) {
    localStorage.setItem('p_cart', JSON.stringify(cart));
    this.cartSubject.next([...cart]);
  }

  private loadCart(): CartItem[] {
    const saved = localStorage.getItem('p_cart');
    if (!saved) return [];
    const items: CartItem[] = JSON.parse(saved);
    return items.map(i => ({ ...i, included: i.included !== false }));
  }

  private loadSaved(): SavedItem[] {
    const saved = localStorage.getItem('p_saved');
    return saved ? JSON.parse(saved) : [];
  }

  clearIncluded() {
    const remaining = this.cartSubject.value
      .filter(i => i.included === false)
      .map(i => ({ ...i, included: true }));
    localStorage.setItem('p_cart', JSON.stringify(remaining));
    this.cartSubject.next(remaining);
  }

  clearCart() {
    this.cartSubject.next([]);
    localStorage.removeItem('p_cart');
  }
}