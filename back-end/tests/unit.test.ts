import { recommendationService }from '../src/services/recommendationsService.js';
import { recommendationRepository } from '../src/repositories/recommendationRepository.js';
import * as recommendationFactory from './factories/recommendationFactory.js';
import { conflictError, notFoundError } from "../src/utils/errorUtils.js";

beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
});

describe('Tests function insert of recommendationService', () => {
    it('Should create a new recommendation', async () => {
        const music = await recommendationFactory.recommendationBody();

        jest.spyOn(recommendationRepository, "findByName").mockResolvedValueOnce(null);

        jest.spyOn(recommendationRepository, "create").mockImplementationOnce((): any => {});

        await recommendationService.insert(music);

        expect(recommendationRepository.create).toBeCalled();

    });

    it("Shouldn't create a duplicated recommendation", async () => {
        const existingRecommendation = await recommendationFactory.recommendationData();

        jest.spyOn(recommendationRepository, "findByName").mockResolvedValueOnce(existingRecommendation);

        const result = recommendationService.insert({
            name: existingRecommendation.name, 
            youtubeLink: existingRecommendation.youtubeLink
        });

        await expect(result).rejects.toEqual(conflictError("Recommendations names must be unique"));

        expect(recommendationRepository.create).not.toBeCalled();
    });
});

describe('Tests function getById of recommendationService', () => {
    it('Should get the recommendation', async () => {
        const existingRecommendation = await recommendationFactory.recommendationData();

        jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(existingRecommendation);

        const result = await recommendationService.getById(existingRecommendation.id);

        expect(result).toMatchObject(existingRecommendation);
    });

    it("Shouldn't find recommendation", async () => {
        const existingRecommendation = await recommendationFactory.recommendationData();

        jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(null);

        const result = recommendationService.getById(existingRecommendation.id);

        expect(result).rejects.toEqual(notFoundError());
    });
});