import app from '../src/app.js';
import supertest from 'supertest';
import { prisma } from "../src/database";
import { recommendationBody } from './factories/recommendationFactory.js';

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE recommendations RESTART IDENTITY;`;
});

describe("POST /recommendations", () => {
    it("returns 201 for valid input and right insert in the database", async () => {
        const music = await recommendationBody();

        const result = await supertest(app).post('/recommendations').send(music);

        const createdRecommendation = await prisma.recommendation.findUnique({
            where: { name: music.name }
        });

        expect(result.status).toBe(201);
        expect(createdRecommendation).not.toBeNull;
    });

    it("returns 409 for using an existing music name in the database", async () => {
        const music = await recommendationBody();

        await supertest(app).post('/recommendations').send(music);

        const result = await supertest(app).post('/recommendations').send(music);

        expect(result.status).toBe(409);
    });

    it("returns 422 for invalid input", async () => {
        const result = await supertest(app).post('/recommendations').send({});

        expect(result.status).toBe(422);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});