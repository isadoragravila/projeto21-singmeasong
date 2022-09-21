import { faker } from '@faker-js/faker';
import { prisma } from "../../src/database";

export async function recommendation() {
    return {
        name: faker.lorem.words(5),
        youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y"
    }
};

export async function create() {
    const body = await recommendation();

    const createdRecommendation = await prisma.recommendation.create({
        data: body
    });
    return createdRecommendation;
}

export async function createWithLowScore() {
    const body = await recommendation();

    const createdRecommendation = await prisma.recommendation.create({
        data: { ...body, score: -5 }
    });
    return createdRecommendation;
}

export async function createTenPlusItems() {
    for (let i = 0; i < 11; i++) {
        const body = await recommendation();

        await prisma.recommendation.create({
            data: body
        });
    }
    return
}