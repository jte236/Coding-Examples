const x_key = Symbol('x')
const y_key = Symbol('x')

class Vec2
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
    }

    get x()
    {
        return this[x_key];
    }

    get y()
    {
        return this[y_key];
    }

    set y(val)
    {
        if (this[y_key] === undefined)
            this[y_key] = val;
    }

    set x(val)
    {
        if (this[x_key] === undefined)
            this[x_key] = val;
    }

    length()
    {
        return Math.sqrt(this.x ** 2 + this.y ** 2)
    }
}

class Map
{
    /**
     * Creates a new map.
     * @param points {Array[Vec2]}
     */
    constructor(points) 
    {
        this.points = points;
    }
    // implement special function to allow iteration
    [Symbol.iterator]()
    {
        const func = this.points[Symbol.iterator];
        return func();
    }

}

const our_map = new Map([
    new Vec2(0, 0),
    new Vec2(2, 0),
    new Vec2(2, 2),
    new Vec2(0, 2),
])

for (let point of our_map) 
{
    console.log(point)
}



