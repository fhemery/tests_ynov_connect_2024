import {BirthdayNotebook} from "./birthdays";

describe("birthdays", function () {

    let notebook: BirthdayNotebook;

    beforeEach(() => {
        notebook = new BirthdayNotebook();
    })

    it('should return nothing if there are no birthdays at all', () => {
        const birthdays = notebook.getBirthdays(new Date());

        expect(birthdays.length).toBe(0);
        expect(birthdays).toHaveLength(0);   // Same as above
        expect(birthdays).toEqual([]);      // Not .toBe()
    });

    it('should return nothing if there are birthdays, but no for current date', () => {
        const firstOfJanuary = new Date(2015, 0, 1);
        const secondOfJanuary = new Date(2015, 0, 2);

        notebook.addBirthday('John', firstOfJanuary);

        expect(notebook.getBirthdays(secondOfJanuary)).toEqual([])
    });

    it('should return all the birthdays of a given date', () => {
        // ARRANGE
        const firstOfJanuary = new Date(2015, 0, 1);
        const secondOfJanuary = new Date(2015, 0, 2);

        const notebook = new BirthdayNotebook();
        notebook.addBirthday('Alice', firstOfJanuary);
        notebook.addBirthday('Bob', secondOfJanuary);
        notebook.addBirthday('Carol', secondOfJanuary);

        // ACT
        const result = notebook.getBirthdays(secondOfJanuary);

        // ASSERT
        expect(result).toHaveLength(2);

        // Solution 1 ==> WHITE BOX ==> We assume the order
        expect(result).toEqual(['Bob', 'Carol']);

        // Solution 2 ==> BETTER ==> BLACK BOX
        expect(result).toContain('Bob');
        expect(result).toContain('Carol');
    });
});
