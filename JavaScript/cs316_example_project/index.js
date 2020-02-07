const _ = require('lodash')

console.log(_.capitalize('THIS STRING SHOULD NOT BE IN ALL CAPS IF LODASH IS OPERATING CORRECTLY'))

const Vec2 = require('./Vec2')
const Polygon = require('./Polygon')

const v1 = new Vec2(1, 2)
const v2 = new Vec2(3, 4)
const v3 = new Vec2(5, 6)
const v4 = new Vec2(7, 8)

const poly = new Polygon([v1, v2, v3, v4])

console.log(v1); // Vec2 { x: 1, y: 2 }
console.log(v2); // Vec2 { x: 3, y: 4 }
console.log(v3); // Vec2 { x: 5, y: 6 }
console.log(v4); // Vec2 { x: 7, y: 8 }

console.log(poly);

poly.writeToFile('./polygon.json');
