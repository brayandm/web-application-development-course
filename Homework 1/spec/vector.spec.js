const Vector = require("../src/Vector");

describe("Vector", function () {
    let a, b, scalar, sum, diff, product;

    beforeEach(function () {
        a = new Vector(2, 1);
        b = Vector.of(-2, 3);
        scalar = 2;
        sum = a.add(b);
        diff = a.subtract(b);
        product = a.multiply(scalar);
    });

    it("should correctly create a vector", function () {
        expect(a.x).toBe(2);
        expect(a.y).toBe(1);
    });

    it("should correctly create a vector using static method", function () {
        expect(b.x).toBe(-2);
        expect(b.y).toBe(3);
    });

    it("should correctly add two vectors", function () {
        expect(sum.x).toBe(0);
        expect(sum.y).toBe(4);
    });

    it("should correctly subtract two vectors", function () {
        expect(diff.x).toBe(4);
        expect(diff.y).toBe(-2);
    });

    it("should correctly multiply vector by a scalar", function () {
        expect(product.x).toBe(4);
        expect(product.y).toBe(2);
    });

    it("should correctly calculate the length of the vector", function () {
        expect(sum.abs()).toBeCloseTo(4.0, 1);
    });

    it("should correctly calculate the unit vector", function () {
        let unit = sum.unit();
        expect(unit.x).toBeCloseTo(0.0, 1);
        expect(unit.y).toBeCloseTo(1.0, 1);
    });

    it("should throw an error when calculating the unit vector of a zero vector", function () {
        let zeroVector = new Vector(0, 0);
        expect(function () {
            zeroVector.unit();
        }).toThrowError("Cannot compute unit vector of a zero vector.");
    });

    it("should correctly calculate the direction angle in radians", function () {
        expect(sum.angle()).toBeCloseTo(1.5708, 4); // π/2 radians
    });

    it("should correctly calculate the direction angle in degrees", function () {
        expect(sum.angle(false)).toBeCloseTo(90.0, 1);
    });
});
