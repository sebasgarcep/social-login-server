import { User } from "@prisma/client";

import { Session } from "../types";
import { EXPIRATION_WINDOW } from "../values";

export async function getSessionByUser(user: User): Promise<Session> {
    const expiresAt = (new Date(Date.now() + EXPIRATION_WINDOW)).getTime();

    return {
        userId: user.id,
        expiresAt,
    };
}