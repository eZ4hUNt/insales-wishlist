Site.templates.product_block= function (product) {
	var brand = '';

	for (var i = 0; i < product.characteristics.length; i++) {
		var characteristic = product.characteristics[i];
		if (characteristic.property_id == Site.properties.brand) {
			brand = characteristic;
		};
	};

	output = '\
<div class="product-item" data-product-item="' +  product.variants[0].id + '" data-product-id="' + product.id + '">\
	<div class="product-item__wrapper">\
		<div class="product-item__image">\
			<div class="product-item__image-in">\
				<a class="product-item__image-link" href="' +  product.url + '" data-product-link style="background: url(' +  product.images[0].medium_url + ') center no-repeat;background-size: contain;">\
					\
				</a>\
			</div>\
		</div>\
		\
		<div class="product-item__content">\
\
			<div class="product-item__title">\
				<a class="product-item__title-link" href="' +  product.url + '">\
					' + product.title + '\
				</a>\
			</div>\
\
			<div class="product-item__brand">\
				<div class="product-item__brand-wrap">\
					<a href="/collection/' +  brand.permalink + '" title="">\
						' +  brand.title + '\
					</a>\
					\
				</div>\
			</div>\
		</div>\
    		    \
		<div class="product-item__price">\
			' +  Shop.money.format(product.variants[0].sale_price) + '\
		</div>\
		\
\
		<div class="product-item__operations row">\
			<form action="/cart_items" method="post" class="js-product-form product-item__cart-form" data-product-id="' + product.id + '">\
\
				<input type="hidden" name="variant_id" value="' +  product.variants[0].id + '" >\
				<input type="hidden" name="quantity" value="1" data-product-quantity  data-variant-id="' +  product.variants[0].id + '"/>\
				\
	\
				<button type="button" class="product-item__cart button button_white" data-item-add>\
					<span class="product-item__cart-ico button__ico"></span>\
					<span class="product-item__cart-text button__text">Купить</span>\
				</button>\
			</form>\
		</div>\
	</div>\
</div>\
'
	return output;
}

