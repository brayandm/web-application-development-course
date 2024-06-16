/**
 * Class representing a 2D vector.
 */
class Vector {
    /**
     * Create a vector.
     * @param {number} x - The x-coordinate.
     * @param {number} y - The y-coordinate.
     */
    constructor(x, y) {
        this._x = x;
        this._y = y;
        Object.freeze(this);
    }

    /**
     * Adds two vectors.
     * @param {Vector} v - The vector to add.
     * @returns {Vector} A new vector that is the sum of this and the given vector.
     */
    add(v) {
        return new Vector(this._x + v._x, this._y + v._y);
    }

    /**
     * Subtracts a vector from this vector.
     * @param {Vector} v - The vector to subtract.
     * @returns {Vector} A new vector that is the difference of this and the given vector.
     */
    subtract(v) {
        return new Vector(this._x - v._x, this._y - v._y);
    }

    /**
     * Multiplies this vector by a scalar.
     * @param {number} scalar - The scalar to multiply by.
     * @returns {Vector} A new vector that is the product of this vector and the scalar.
     */
    multiply(scalar) {
        return new Vector(this._x * scalar, this._y * scalar);
    }

    /**
     * Calculates the length of the vector.
     * @returns {number} The length of the vector.
     */
    abs() {
        return Math.sqrt(this._x * this._x + this._y * this._y);
    }

    /**
     * Calculates the unit vector.
     * @returns {Vector} A new vector that is the unit vector of this vector.
     */
    unit() {
        const length = this.abs();
        if (length === 0) {
            throw new Error("Cannot compute unit vector of a zero vector.");
        }
        return new Vector(this._x / length, this._y / length);
    }

    /**
     * Calculates the direction angle of the vector in radians.
     * @returns {number} The direction angle of the vector in radians.
     */
    angle() {
        return Math.atan2(this._y, this._x);
    }

    /**
     * Gets the x-coordinate.
     * @returns {number} The x-coordinate of the vector.
     */
    get x() {
        return this._x;
    }

    /**
     * Gets the y-coordinate.
     * @returns {number} The y-coordinate of the vector.
     */
    get y() {
        return this._y;
    }
}

// Example usage:
const a = new Vector(1, 2);
console.log(`Vector a: (${a.x}, ${a.y})`);

const b = new Vector(3, -2);
console.log(`Vector b: (${b.x}, ${b.y})`);

const scalar = 2;

const sum = a.add(b);

console.log(`Sum of a and b: (${sum.x}, ${sum.y})`);

const diff = a.subtract(b);

console.log(`Difference of a and b: (${diff.x}, ${diff.y})`);

const product = a.multiply(scalar);

console.log(`Product of a and ${scalar}: (${product.x}, ${product.y})`);

const abs = sum.abs();

console.log(`Length of sum: ${abs}`);

const unit = sum.unit();

console.log(`Unit vector of sum: (${unit.x}, ${unit.y})`);

const angle = sum.angle();

console.log(`Direction angle of sum: ${angle}`);
