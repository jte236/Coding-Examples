const fs = require('fs');
const _ = require('lodash')

class Polygon 
{
    constructor(coordinates)
    {
        this.coordinates = coordinates;
    }

    writeToFile(filepath)
    {
        const data = JSON.stringify(this, null, 2);
        fs.writeFileSync(filepath, data);
    }

    clone()
    {
        return _.cloneDeep(this);
    }
}

module.exports = Polygon;