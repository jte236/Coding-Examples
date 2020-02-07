{
    let a = 2
    let b = 2

    a *= 3 + (b = 3)

    console.log(a); //12
    console.log(b); //3
}

{
    let a = 1
    let b = 2

    a += 2 * (b *= 3)

    console.log(a); //13
    console.log(b); //6
}

{
    let a = "" + 5 + 0
    let b = true + false
    let c = undefined + 1
    let d = '4' - '3' + '2'
    let e = '2' + '4' - '3'
    let f = 'a' + 4
    let g = "\n" - 2

    console.log(a)
    console.log(b)
    console.log(c)
    console.log(d)
    console.log(e)
    console.log(f)
    console.log(g)
}

{
    function printRequiredPieces(num_kings, num_queens, num_rooks, num_bishops, num_knights, num_pawns)
    {
        const kings = 1
        const queens = 1
        const rooks = 2
        const bishops = 2
        const knights = 2
        const pawns = 8

        let neededKings = kings - num_kings
        let neededQueens = queens - num_queens
        let neededrooks = rooks - num_rooks
        let neededbishops = bishops - num_bishops
        let neededknights = knights - num_knights
        let neededpawns = pawns - num_pawns

        let totalNewSet = `${neededKings} ${neededQueens} ${neededrooks} ${neededbishops} ${neededknights} ${neededpawns}`

        console.log(totalNewSet)
    }

    printRequiredPieces(2,1,2,1,2,1);
}

{
    function getQuadrant(x,y)
    {
        if(x >= 0 && y >= 0 )
            console.log(1);
        else if(x < 0 && y >= 0)
            console.log(2)
        else if(x < 0 && y < 0)
            console.log(3)
        else if ( x >= 0 && y < 0)
            console.log(4)
    }

    getQuadrant(1,0)
    getQuadrant(-1,0)
    getQuadrant(-1,-1)
    getQuadrant(1,-1)
}