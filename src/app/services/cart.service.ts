import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { shoppingCartItems, shoppingCartItemsImport } from '../shoppingCartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private url: string = '../../assets/shopping-cart-items.json';
  
  constructor(private http: HttpClient) { }

  // Load the shopping cart list from the JSON file
  public async getShoppingCartItems(): Promise<shoppingCartItems> {
    let result: Observable<shoppingCartItemsImport> = this.http.get<shoppingCartItemsImport>(this.url);
    let data: shoppingCartItemsImport | any = await lastValueFrom(result);
    return data["shopping_cart_items"];
  }

}
