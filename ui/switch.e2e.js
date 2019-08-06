import { Selector, ClientFunction } from 'testcafe';

const getPageUrl = ClientFunction(() => window.location.href);

fixture `Start testing`
	.page `http://localhost:8080/#/lagertechnik/Miet-Hochhubwagen+-+1t_2000mm-Hubh_id2106+-+jetzt+mieten-42181`;

test('Click forward', async browser => {
	await browser.click('[data-test="productNext"]');
	await browser.expect(Selector('[data-test="index"]').innerText).contains('4');
});

test('Click previous', async browser => {
	await browser.click('[data-test="productPrevious"]');
	await browser.expect(Selector('[data-test="index"]').innerText).contains('2');
});

test('Click backward', async browser => {
	await browser.click('[data-test="productBackward"]');
	await browser.expect(Selector('[data-test="index"]').innerText).contains('1');
});

test.skip('Return to the root', async browser => {
	await browser.click('[data-test="productBackward"]');
	await browser.expect(getPageUrl()).contains('/#');
});
