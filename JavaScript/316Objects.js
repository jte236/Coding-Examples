function containsDuplicateWords(text)
{
    let all_words = text.split(' ')
    let known_words = {}

    for (let i=0; i<all_words.length; i++)
    {
        let current_word = all_words[i]

        if (known_words.hasOwnProperty(current_word))
        {
            result = true
        }
    }
    return result
}

console.log(nums.reduce((sum,num) => sum + num, 0))

