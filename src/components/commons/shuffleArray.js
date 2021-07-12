const tags = ["mediterranean", "indian", "italian", "european", "greek", "chinese,", "asian", "cajun", "creole", "american", "thai"]
const wine = ["white_wine", "red_wine"]
const randNum = Math.floor(Math.random() * 100)

//shuffles values in array passed in and returns the first value in that array
const shuffleArray = (arr) => {
    const sortTags = arr.sort(() => Math.random() - 0.5)
    return sortTags.shift()
}

const ourRandomTags = shuffleArray(tags)
const ourRandomWines = shuffleArray(wine)

export default shuffleArray
export {ourRandomTags, ourRandomWines, randNum}

