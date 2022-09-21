import app from '../src/app.js';
import supertest from 'supertest';
import { prisma } from "../src/database";
import * as recommendationFactory from './factories/recommendationFactory.js';

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE recommendations RESTART IDENTITY;`;
});

const agent = supertest(app);

describe("POST /recommendations", () => {
    it("returns 201 for valid input and right insert in the database", async () => {
        const music = await recommendationFactory.recommendation();

        const result = await agent.post('/recommendations').send(music);

        const createdRecommendation = await prisma.recommendation.findUnique({
            where: { name: music.name }
        });

        expect(result.status).toBe(201);
        expect(createdRecommendation).not.toBeNull;
    });

    it("returns 409 for using an existing music name in the database", async () => {
        const music = await recommendationFactory.recommendation();

        await agent.post('/recommendations').send(music);

        const result = await agent.post('/recommendations').send(music);

        expect(result.status).toBe(409);
    });

    it("returns 422 for invalid input", async () => {
        const result = await agent.post('/recommendations').send({});

        expect(result.status).toBe(422);
    });
});

describe('POST /recommendations/:id/upvote', () => {
    it('returns 404 for id not found', async () => {
        const id = 1000;

        const result = await agent.post(`/recommendations/${id}/upvote`).send({});

        expect(result.status).toBe(404);
    });

    it('returns 200 for success in upvote', async () => {
        const music = await recommendationFactory.create();
        const { id, score } = music;

        const result = await agent.post(`/recommendations/${id}/upvote`).send({});

        const recommendation = await prisma.recommendation.findUnique({
            where: { id }
        });

        expect(result.status).toBe(200);
        expect(recommendation.score).toBe(score + 1);
    });
});

describe('POST /recommendations/:id/downvote', () => {
    it('returns 404 for id not found', async () => {
        const id = 1000;

        const result = await agent.post(`/recommendations/${id}/downvote`).send({});

        expect(result.status).toBe(404);
    });

    it('returns 200 for success in downvote', async () => {
        const music = await recommendationFactory.create();
        const { id, score } = music;

        const result = await agent.post(`/recommendations/${id}/downvote`).send({});

        const recommendation = await prisma.recommendation.findUnique({
            where: { id }
        });

        expect(result.status).toBe(200);
        expect(recommendation.score).toBe(score - 1);
    });

    it('returns 200 and delete recommendation when score gets lower then -5', async () => {
        const music = await recommendationFactory.createWithLowScore();
        const { id } = music;

        const result = await agent.post(`/recommendations/${id}/downvote`).send({});

        const recommendation = await prisma.recommendation.findUnique({
            where: { id }
        });

        expect(result.status).toBe(200);
        expect(recommendation).toBeNull;
    });
});

describe('GET /recommendations', () => {
    it('returns array for success and object in the right format', async () => {
        const createdRecommendation = await recommendationFactory.create();

        const result = await agent.get('/recommendations');

        expect(result.body).toBeInstanceOf(Array);
        expect(result.body[0]).toMatchObject(createdRecommendation);
    });
    it('returns array with length equal to 10', async () => {
        await recommendationFactory.createTenPlusItems();

        const result = await agent.get('/recommendations');

        expect(result.body.length).toBe(10);
    });
});

describe('GET /recommendations/:id', () => {
    it('returns 404 for id not found', async () => {
        const id = 1000;

        const result = await agent.get(`/recommendations/${id}`);

        expect(result.status).toBe(404);
    });
    it('returns object in the right format for success', async () => {
        const createdRecommendation = await recommendationFactory.create();

        const { id } = createdRecommendation;

        const result = await agent.get(`/recommendations/${id}`);

        expect(result.body).toMatchObject(createdRecommendation);
        expect(result.status).toBe(200);
    })
});

afterAll(async () => {
    await prisma.$disconnect();
});