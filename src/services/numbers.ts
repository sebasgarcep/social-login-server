import axios from 'axios';

const endpoint = 'http://numbersapi.com/random/math';

export async function getRandomNumberFact() {
    const result = await axios(endpoint);
    return result.data as string;
}