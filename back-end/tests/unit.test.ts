import { recommendationService }from '../src/services/recommendationsService.js';
import { recommendationRepository } from '../src/repositories/recommendationRepository.js';
import * as recommendationFactory from './factories/recommendationFactory.js';
import { conflictError } from "../src/utils/errorUtils.js";

beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
});

describe('Testing services', () => {
    it('Should create a new recommendation', async () => {
        const music = await recommendationFactory.recommendation();

        jest.spyOn(recommendationRepository, "findByName").mockResolvedValueOnce(null);

        jest.spyOn(recommendationRepository, "create").mockImplementationOnce((): any => {});

        await recommendationService.insert(music);

        expect(recommendationRepository.create).toBeCalled();

    });

    it("Shouldn't create a duplicated recommendation", async () => {
        const existingRecommendation = await recommendationFactory.existingRecommendation();

        jest.spyOn(recommendationRepository, "findByName").mockResolvedValueOnce(existingRecommendation);

        const result = recommendationService.insert({
            name: existingRecommendation.name, 
            youtubeLink: existingRecommendation.youtubeLink
        });

        await expect(result).rejects.toEqual(conflictError("Recommendations names must be unique"));

        expect(recommendationRepository.create).not.toBeCalled();
    });
});