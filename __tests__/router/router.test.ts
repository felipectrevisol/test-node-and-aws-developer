import {describe, test, expect} from "@jest/globals"

describe('Match URL With Regex', () => {

    test('Match client/all', () => {
        const uri = 'client/all';
        const path: RegExp = /client+[/]all+/gi;
        expect(path.test(uri)).toBe(true);
    });
})