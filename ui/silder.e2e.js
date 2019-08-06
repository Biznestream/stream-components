import { Selector } from 'testcafe';

fixture `Start testing slider`
	.page `http://localhost:8080/#/lagertechnik/Miet-Hochhubwagen+-+1t_2000mm-Hubh_id2106+-+jetzt+mieten-42181`;

test.skip('Select image', async browser => {
	const image = Selector('.list-product-images a img').nth(2).withAttribute('src', 'https://www.fds-stapler.de/image/108313/GC15S-5-doosan.jpg');
	await browser.click(Selector('.list-product-images a').nth(2));
	await browser.expect(Selector('[data-test="thumbnail"]').hasAttribute('src'));
});