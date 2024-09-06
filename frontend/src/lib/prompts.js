export const prompts = [
	{
		prompt: 'Is the first paragraph able to give a general background on the broader research area? Please rate it out of 5.',
		system_prompt: 'answer the question and respond in with this json format {"score" :number, "comment" :text} where `scores` can be number from 1 to 5 and `comment` can be text with less than 200 words:',
		tag: 'score',
		section: 'Introduction',
		paragraph: 1,
	},
	{
		prompt: 'Is the paragraph able to extending the general background to relate to the main idea of research, and touching on the importance and impact of the study? Make sure there is no repeated sentences from the sentences or idea from the previous paragraph. Please rate it out of 5.  Critically give the ratings.',
		system_prompt: 'answer the question and respond in with this json format {"score" :number, "comment" :text} where `scores` can be number from 1 to 5 and `comment` can be text with less than 200 words:',
		tag: 'score',
		section: 'Introduction',
		paragraph: 2,
	},
	{
		prompt: 'Is the paragraph addressing a knowledge gap and clearly stating a thesis or a research statement? Make sure there is no repeated sentences from the sentences or idea from the previous paragraph. Please rate it out of 5.  Critically give the ratings.',
		system_prompt: 'answer the question and respond in with this json format {"score" :number, "comment" :text} where `scores` can be number from 1 to 5 and `comment` can be text with less than 200 words:',
		tag: 'score',
		section: 'Introduction',
		paragraph: 3,
	},
	{
		prompt: 'Is the paragraph a small overview of the results and conclusions, or is it summarizing the research conducted? Make sure there is no repeated sentences from the sentences or idea from the previous paragraph. Please rate it out of 5.  Critically give the ratings.',
		system_prompt: 'answer the question and respond in with this json format {"score" :number, "comment" :text} where `scores` can be number from 1 to 5 and `comment` can be text with less than 200 words:',
		tag: 'score',
		section: 'Introduction',
		paragraph: 4,
	},
]