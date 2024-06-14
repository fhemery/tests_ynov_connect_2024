import {ReceiptPrinter} from "../src/ReceiptPrinter";
import {Receipt} from "../src/model/Receipt";
import {Product} from "../src/model/Product";
import {ProductUnit} from "../src/model/ProductUnit";

function extractFromTicket(ticket: string, lineNumber: number, fromCol: number, toCol: number): string {
    return ticket.split('\n')[lineNumber].substring(fromCol, toCol);
}

describe('ReceiptPrinter', () => {
    let receiptPrinter: ReceiptPrinter;

    beforeEach(() => {
        receiptPrinter = new ReceiptPrinter();
    });

    it('should print a receipt with 0 product', () => {
        const receipt = new Receipt();

        const ticket = receiptPrinter.printReceipt(receipt);

        expect(ticket).toEqual('\nTotal:                              0.00');
        expect(ticket).toContain('Total:');
        expect(ticket).toContain('0.00');
    })

    describe('with one product', () => {
        it('should print the correct receipt (with helper function)', () => {
            const receipt = new Receipt();
            const apples = new Product('apples', ProductUnit.Kilo);
            receipt.addProduct(apples, 2, 2.5, 5);

            const ticket = receiptPrinter.printReceipt(receipt);

            expect(extractFromTicket(ticket, 0, 0, 6)).toBe('apples');
            expect(extractFromTicket(ticket, 0, 36, 40)).toBe('5.00');
        });

        it('should print the correct receipt (with snapshot)', () => {
            const receipt = new Receipt();
            const apples = new Product('apples', ProductUnit.Kilo);
            receipt.addProduct(apples, 2, 2.5, 5);

            const ticket = receiptPrinter.printReceipt(receipt);

            expect(ticket).toMatchSnapshot();
        });

    });
});
