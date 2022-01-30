import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { shoppingCartItem, shoppingCartItems } from '../shoppingCartItem';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  public totalCartItemNumber: number = 0;
  public totalPrice: number = 0;
  public cartVisibility: boolean = false;
  public shoppingCartItems: shoppingCartItems = [];
  private crossesVisibilityStatusList: boolean[] = [];
  public alertVisibility: boolean = false;

  constructor(private message: MessageService, private cartService: CartService) { }

  async ngOnInit(): Promise<void> {
    // Wait for the shopping cart list to be loaded by the cartService
    this.shoppingCartItems = await this.cartService.getShoppingCartItems();
    this.prepare();
  }

  private prepare(): void {
    this.calculateTotalPriceAndItemNumber();
    // Initializes the crossesVisibilityStatusList with false
    for (let i: number = 0; i < this.shoppingCartItems.length; i++) {
      this.crossesVisibilityStatusList[i] = false;
    }
    this.message.getCartVisibilityMessage().subscribe(cartVisibility => {
      this.cartVisibility = Boolean(cartVisibility);
    });
    this.message.getAltertVisibilityMessage().subscribe(alertVisibility => {
      this.alertVisibility = Boolean(alertVisibility);
    });
  }

  // Updates the item count
  public handleCounterChange(counterOperation: number, item: shoppingCartItem): void {
    if (counterOperation == -1) {
      if (item.count > 1) {
        item.count--;
      }
    } else {
      item.count++;
    }
    this.calculateTotalPriceAndItemNumber();
  }

  // Updates total number of items and total price
  private calculateTotalPriceAndItemNumber(): void {
    this.totalCartItemNumber = 0;
    this.totalPrice = 0;
    for (let i: number = 0; i < this.shoppingCartItems.length; i++) {
      this.totalCartItemNumber += this.shoppingCartItems[i].count;
      this.totalPrice += this.shoppingCartItems[i].count * this.shoppingCartItems[i].price;
    }
    // Submits the total number of items in cart to the badge in toolbar
    this.message.sendTotalCartItemNumberMessage(this.totalCartItemNumber);
  }

  // Removes single item from shopping cart
  public removeShoppingCartItem(item: shoppingCartItem): void {
    this.crossesVisibilityStatusList.splice(this.shoppingCartItems.indexOf(item), 1);
    this.shoppingCartItems.splice(this.shoppingCartItems.indexOf(item), 1);
    this.calculateTotalPriceAndItemNumber();
  }

  // Pressing "Checkout"
  public removeAllShoppingCartItems(): void {
     // Remove all items from shopping cart 
    this.crossesVisibilityStatusList.splice(0, this.shoppingCartItems.length);
    this.shoppingCartItems.splice(0, this.shoppingCartItems.length);
    this.calculateTotalPriceAndItemNumber();
    // Remove shopping cart visibility
    this.cartVisibility = false;
    this.message.sendCartVisibilityMessage(this.cartVisibility);
    // Triggers alert message after "Checkout" is done
    this.alertVisibility = true;
    this.message.sendAlertVisibilityMessage(this.alertVisibility);
  }

  // Updates the visibility of closing cross in cart item on mouseenter/-leave
  public setRemoveCrossVisibility(isVisible: boolean, item: shoppingCartItem): void {
    this.crossesVisibilityStatusList[this.shoppingCartItems.indexOf(item)] = isVisible;
  }

  // Returns the visibility of closing cross in cart item
  public getRemoveCrossVisibility(item: shoppingCartItem): boolean {
    return this.crossesVisibilityStatusList[this.shoppingCartItems.indexOf(item)];
  }

}