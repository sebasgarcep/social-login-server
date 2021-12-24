import { User } from '@prisma/client';

import db from '../services/db';

export async function getOrCreateUserByGoogleId(googleId: string): Promise<User> {
    const user = await db.user.findFirst({
        where: {
            googleId: {
                equals: googleId,
            },
        },
    });

    if (user) {
        return user;
    }

    return db.user.create({
        data: {
            googleId,
        },
    });
};