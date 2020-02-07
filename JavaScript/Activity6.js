// Question 1 

function delay(ms)
{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    })
}

async function delayAsync(ms)
{
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    })
}

function delayedPrint(text,ms)
{
    delay(ms)
        .then(() => console.log(text));
}

async function delayPrintAsync(text, ms)
{
    await delay(ms)
    console.log(text);
}



// test cases
delay(500)
    .then(() => {
        console.log('test delay worked')
    });

(async () => {
    await delayAsync(100)
    console.log('async delay test')
})()

let text = 'delayed print works';
delayedPrint(text, 500);

let text2 = "delayed async test worked";
(async () => {
    await delayPrintAsync(text2, 500);
})()