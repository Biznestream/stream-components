import { ClientFunction } from 'testcafe';

const getPageUrl = ClientFunction(() => window.location.href);

fixture `Start testing`
	.page `http://localhost:8080/#`;

test('Should pass to the product page', async browser => {
	await browser.click('[data-test="productCard"]');
	await browser.expect(getPageUrl()).contains('/lagertechnik');
});
