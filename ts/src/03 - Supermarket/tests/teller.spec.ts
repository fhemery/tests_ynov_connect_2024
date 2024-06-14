import {Teller} from "../src/model/Teller";
import {ShoppingCart} from "../src/model/ShoppingCart";
import {FakeCatalog} from "./FakeCatalog";
import {Product} from "../src/model/Product";
import {ProductUnit} from "../src/model/ProductUnit";
import {Receipt} from "../src/model/Receipt";
import {SpecialOfferType} from "../src/model/SpecialOfferType";

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
        expect(receipt.getItems()).toHaveLength(1);
        expect(receipt.getItems()[0].quantity).toBe(2.5);
        expect(receipt.getItems()[0].product).toEqual(apples);
    });

    // Other way
    describe('When adding multiple products', () => {
        let receipt: Receipt;
        let apples: Product;
        beforeEach(() => {
            // ARRANGE
            const catalog = new FakeCatalog();
            const teller = new Teller(catalog);
            apples = new Product('Apples', ProductUnit.Kilo);
            const bananas = new Product('Bananas', ProductUnit.Kilo);

            catalog.addProduct(apples, 2);
            catalog.addProduct(bananas, 3);

            const shoppingCart = new ShoppingCart();
            shoppingCart.addItemQuantity(apples, 2.5);
            shoppingCart.addItemQuantity(bananas, 1.5);

            // ACT
            receipt = teller.checksOutArticlesFrom(shoppingCart);
        })

        it('should compute the correct total price', () => {
            expect(receipt.getTotalPrice()).toBe(9.5);
        });

        it('should have the correct items on the receipt', () => {
            expect(receipt.getItems()).toHaveLength(2);
            expect(receipt.getItems().find(p=> p.product.name === apples.name)?.product).toEqual(apples);
        });
        // and so on...
    });

    it('should work with a discount', () => {
        const catalog = new FakeCatalog();
        const teller = new Teller(catalog);
        const apples = new Product('Apples', ProductUnit.Kilo);

        catalog.addProduct(apples, 2);

        teller.addSpecialOffer(SpecialOfferType.TenPercentDiscount, apples, 10);

        const shoppingCart = new ShoppingCart();
        shoppingCart.addItemQuantity(apples, 2.5);

        // ACT
        const receipt = teller.checksOutArticlesFrom(shoppingCart);
        expect(receipt.getTotalPrice()).toEqual((2 * 2.5) * 0.90);
    });
});
