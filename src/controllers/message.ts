import { getRandomNumberFact } from "../services/numbers";

export function getRandomMessage(): Promise<string> {
    return getRandomNumberFact();
}