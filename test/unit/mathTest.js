const assert = require("assert");

describe("Math in JS", () => {
    it("should support addition", (done) => {
        setTimeout(() => {
            assert.deepStrictEqual(1 + 2, 3);
            done();
        }, 0);

    });
});