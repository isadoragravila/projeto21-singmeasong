import { faker } from '@faker-js/faker';

export async function recommendationBody() {
    return {
        name: faker.lorem.words(5),
        youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y"
    }
}