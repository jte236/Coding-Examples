/* Pa1 Vector Class
 * Author: Jack Teegarden
 * Created: Jan 25, 2019
 * Modified: Feb 6, 2019
 * Creating a vector class
 * with following functions: copy, add, suntract, cross, dot, scale, angle, angleBetween, and toPrimitive 
 * Style Guide: Google's style guide
 * 
 * Help from Thomas Woeste on angle and cross product
 */

const x_key = Symbol('x')
const y_key = Symbol('y')
const z_key = Symbol('z')

class Vec3
{
    // Creates a new vector with the given properties
    constructor(x, y, z)
    {
        this[x_key] = x;
        this[y_key]= y;
        this[z_key] = z;
    }

    set x(val)
    {
        if (this[x_key] === undefined)
            this[x_key] = val;
    }

    set y(val)
    {
        if (this[y_key] === undefined)
            this[y_key] = val;
    }

    set z(val)
    {
        if (this[z_key] === undefined)
            this[z_key] = val;
    }

    get x()
    {
        return this[x_key];
    }

    get y()
    {
        return this[y_key];
    }

    get z()
    {
        return this[z_key];
    }

    // Returns a new vector instance with the same property
    // values as the instance
    copy()
    {
        let Vec3Copy = new Vec3(this.x, this.y, this.z);
        return Vec3Copy;
    }

    // This method must return a new vector equal to the sum 
    // of this vector and the given vector
    add(otherVec)
    {
        if (typeof(otherVec) == 'number') {
            throw new TypeError('parameter num must be a Number');
        } else {
            let addX = otherVec.x + this.x;
            let addY = otherVec.y + this.y;
            let addZ = otherVec.z + this.z;
            let addVec3 = new Vec3(addX, addY, addZ);

            return addVec3;
        }
    }

    // This method must return a vector equal to the difference 
    // between this vector and the given vector
    sub(otherVec)
    {
        if (typeof(otherVec) == 'number') {
            throw new TypeError('parameter num must be a Number');
        } else {
            let subX = this.x - otherVec.x;
            let subY = this.y - otherVec.y;
            let subZ = this.z - otherVec.z;
            let subVec3 = new Vec3(subX, subY, subZ);

            return subVec3;
        }
    }

    // Scales the properties of this vector by the given number 
    // and returns the result as a new vector
    scale(scale)
    {
        if (typeof(otherVec) == 'number') {
            throw new TypeError('parameter num must be a Number');
        } else {
            let scaleX = this.x * scale;
            let scaleY = this.y * scale;
            let scaleZ = this.z * scale;
            let scaleVec3 = new Vec3(scaleX, scaleY, scaleZ);

            return scaleVec3;
        }
    }

    // This method must complete the dot product of this vector
    // and the given vector , returning the resulting number 
    dot(otherVec)
    {
        if (typeof(otherVec) == 'number') {
            throw new TypeError('parameter num must be a Number');
        } else {
            let number = (this.x * otherVec.x) + (this.y * otherVec.y) + (this.z * otherVec.z);
            return number;
        }
    }

    //This method must complete the cross product of this 
    // vector and the given vector
    cross(otherVec)
    {
        if (otherVec instanceof Vec3 == false) {
            throw new TypeError('vector must be an instance of Vec3 class');
        } else {
            let newX = ((this.y * otherVec.z) - (otherVec.y * this.z));
            let newY = ((this.x * otherVec.z) - (otherVec.x * this.z));
            let newZ = ((this.x * otherVec.y) - (this.y * otherVec.x));

            newY = -newY;
            let crossVec = new Vec3(newX, newY, newZ);

            return crossVec;
        }
    }

    //Returns the angle of this vector in radians
    angle()
    {
        let xAngle = this.x;
        let yAngle = this.y;

        if (xAngle == 0) {
            throw new RangeError('The X value can\'t be 0');
        } else if(xAngle >= 0 && yAngle >= 0){
            return Math.atan(yAngle/xAngle);
        } else if(xAngle <= 0 && yAngle >= 0){
            return(Math.PI - Math.atan(Math.abs(yAngle/xAngle)));
        } else if(xAngle <= 0 && yAngle <=0) {
            return(Math.atan(Math.abs(yAngle/xAngle)) - Math.PI);
        } else {
            return(-(Math.atan(Math.abs(yAngle/xAngle))));
        }
    }

    // Returns the angle in radians between this vector 
    // and the given vector
    angleBetween(otherVec)
    {
        if (typeof(otherVec) == 'number') {
            throw new TypeError('parameter num must be a Number');
        } else {
            let numerator = this.dot(otherVec);
            let denominator = (this.length() * otherVec.length());
            let angleBetween = Math.acos(numerator/denominator);

            return angleBetween;
        }
    }

    // Returns the length of this vector
    length()
    {
        if (typeof(otherVec) == 'number') {
            throw new TypeError('parameter num must be a Number');
        } else {
            let length = Math.sqrt((this.x ** 2) + (this.y ** 2) + (this.z ** 2));
            return length;
        }
    }

    // Returns the distance between this vector and given vector
    distance(otherVec)
    {
        if (typeof(otherVec) == 'number') {
            throw new TypeError('parameter num must be a Number');
        } else {
            let distnaceBetween = Math.sqrt((otherVec.x - this.x) ** 2 + (otherVec.y - this.y) ** 2 + (otherVec.z - this.z) ** 2);
            return distnaceBetween;
        }
    }

    // Returns a vector in the same direction as thus vector 
    // but with a length of one
    normalize()
    {
        let lengthVector = Math.sqrt(this.x**2 + this.y**2 + this.z**2);
        let normalizeX = this.x / lengthVector;
        let normalizeY = this.y / lengthVector;
        let normalizeZ = this.z / lengthVector;
        let normalizedVec = new Vec3(normalizeX, normalizeY, normalizeZ);

        return normalizedVec;
    }

    // Returns true if all components of this vector and the given vector are equal,
    // else it returns false
    equals(otherVec)
    {
        if (this.x === otherVec.x){
            if (this.y === otherVec.y){
                if (this.z === otherVec.z){
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else{
            return false;
        }
    }

    [Symbol.toPrimitive]()
    {
        return (`Vec3[x:${this.x},y:${this.y},z:${this.z}]`);
    }
}

module.exports = Vec3;