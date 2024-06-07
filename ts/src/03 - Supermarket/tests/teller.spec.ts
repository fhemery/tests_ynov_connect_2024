import {Teller} from "../src/model/Teller";
import {ShoppingCart} from "../src/model/ShoppingCart";
import {FakeCatalog} from "./FakeCatalog";
import {Product} from "../src/model/Product";
import {ProductUnit} from "../src/model/ProductUnit";

describe('Teller', () => {

    it('should compute the price for one product', () => {
        // ARRANGE
        const catalog = new FakeCatalog();
        const teller = new Teller(catalog);
        const apples = new Product('Apples', ProductUnit.Kilo);

        catalog.addProduct(apples, 2);

        const shoppingCart = new ShoppingCart();
        shoppingCart.addItemQuantity(apples, 2.5);

        // ACT
        const receipt = teller.checksOutArticlesFrom(shoppingCart);

        // ASSERT
        expect(receipt.getTotalPrice()).toBe(5);
        // TODO : add more assertions here.
    })

    // TODO : Write other tests
});
