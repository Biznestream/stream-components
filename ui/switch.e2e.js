import { Selector, ClientFunction } from 'testcafe';

const getPageUrl = ClientFunction(() => window.location.href);

fixture `Start testing`
	// .page `http://localhost:8080/#/lagertechnik/Miet-Hochhubwagen+-+1t_2000mm-Hubh_id2106+-+jetzt+mieten-42181`;
	.page `http://localhost:8080/#/lagertechnik/Miet-Hochhubwagen+-+1t_5000mm-Hubh_id2108+-+jetzt+mieten-40864`;

test('Click forward', async browser => {
	await browser.click('[data-test="productNext"]');
	await browser.expect(Selector('[data-test="index"]').innerText).contains('2');
});

test.skip('Click previous', async browser => {
	await browser.click('[data-test="productPrevious"]');
	await browser.expect(Selector('[data-test="index"]').innerText).contains('2');
});

test.skip('Click backward', async browser => {
	await browser.click('[data-test="productBackward"]');
	await browser.expect(Selector('[data-test="index"]').innerText).contains('1');
});

test('Return to the root', async browser => {
	await browser.click('[data-test="productBackward"]');
	await browser.expect(getPageUrl()).contains('/#');
});
