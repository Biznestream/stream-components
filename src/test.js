import { Selector } from 'testcafe';

fixture `Start testing`
	.page `http://localhost:8080/`;

test('Switch test', async t => {
	await t
		.click(Selector('#productPageBackButton'))
});