ShopWishlist = {}
ShopWishlist.add_product = function(product_id){
	if($.cookie('wishlist_ids') != null && $.cookie('wishlist_ids') != ''){
		var arr = $.cookie('wishlist_ids').split(',');
		if (arr.indexOf(product_id) > -1 ) {
			// alertify.warning('Уже в избранном');
			return;
		}else{
			if (arr.length >= 10) {arr.shift();}
			arr.push(product_id);
			arr_line = arr + '';
			$.cookie("wishlist_ids", null, {path: '/'});	
			$.cookie('wishlist_ids', arr_line, {	path: '/'});
			EventBus.publish('plugins:wishlist:added', arr.length);
			// alertify.success('Добавлено в избранное');
		}
	}else{
		$.cookie('wishlist_ids',product_id, {path: '/'});
		EventBus.publish('plugins:wishlist:added', '1');
		// alertify.success('Добавлено в избранное');
	}
	$('[data-wishlist-add="' + product_id + '"]').addClass('active')
	$('[data-product-id="' + product_id + '"]').addClass('wishlist-added')
}

ShopWishlist.remove_product = function(product_id) {
	if ($.cookie('wishlist_ids') != null && $.cookie('wishlist_ids') != '') {
		var arr = $.cookie('wishlist_ids').split(',');
		for(var i = 0; i < arr.length; i++){
			if(String(arr[i]) == String(product_id)){
				arr.splice(i, 1);
				// alertify.message('Удалено из избранных товаров');
			}
		}
		
		arr_line = arr + '';
		$.cookie("wishlist_ids", null, {path: '/'});	
		$.cookie('wishlist_ids', arr_line, {	path: '/'});
		EventBus.publish('plugins:wishlist:removed', arr.length);
	}
			
	$('[data-wishlist-add="' + product_id + '"]').removeClass('active');
	$('[data-product-id="' + product_id + '"]').removeClass('wishlist-added');
}
ShopWishlist.render = function() {
	var 
		products_ids = $.cookie('wishlist_ids'),
		$container = $('[data-wishlist-products-list]');

	if(products_ids != null && $container.length != 0 ){
		var product_data = this.get();
		product_data.done(function(data){
			$container.html(ShopWishlist.format(data,'block'));
			ShopWishlist.binding()
		});
	}
}

ShopWishlist.format = function(data,type) {
	var products = [];
	$.each(data.products, function(i,product){
		products.push(Site.templates.product_block(product))
	});
	return products
}

ShopWishlist.get = function(){
	var wishlist_ids = $.cookie('wishlist_ids')
	if(wishlist_ids != null) {
		var wishlist =  wishlist_ids.split(",").reverse();
		return $.getJSON("/products_by_id/"+wishlist+".json");
	}
}

ShopWishlist.binding = function($opened_block){
	if (typeof $opened_block !== 'undefined') {
		$wishlist_add = $opened_block.find('[data-wishlist-add]')
		$wishlist_delete = $opened_block.find('[data-wishlist-delete]')
	}else{
		$wishlist_add = $('[data-wishlist-add]')
		$wishlist_delete = $('[data-wishlist-delete]')
	}

	$wishlist_add.on('click', function(event) {
		event.preventDefault();
		product_id = $(this).data('wishlistAdd');
		console.log(product_id)
		if(Site.client.login == 1){
			ShopWishlist.add_product(product_id);
		}else{
			$login_block = $('[data-drop-block="header-login"]').clone();
			$login_block.attr('class', 'login-block modal-form-block modal-form-block_popup')
			Modals.set_window($login_block, {name: 'modal-login'})
			console.log(product_id)
		}
	});

	$wishlist_delete.on('click', function(event) {
		event.preventDefault();
		product_id = $(this).data('wishlistDelete')
		ShopWishlist.remove_product(product_id);
	});
	
	wishlist_ids  = $.cookie('wishlist_ids');
	viewed_ids    = $.cookie('product_ids');
	console.log(wishlist_ids)
	if(wishlist_ids && Site.client.login == 1){
		wishlist_arr = wishlist_ids.split(',');
		for (var i = 0; i < wishlist_arr.length; i++) {
			$('[data-wishlist-add="' + wishlist_arr[i] + '"]').addClass('active');
			console.log($('[data-wishlist-add="' + wishlist_arr[i] + '"]'))
			console.log($('[data-product-id="' + wishlist_arr[i] + '"]'))
			$('[data-product-id="' + wishlist_arr[i] + '"]').addClass('wishlist-added')
		};
	}
}

ShopWishlist.init = function(){
	if(Site.template == 'page-wishlist'){
		ShopWishlist.render();
	}else{
		ShopWishlist.binding()
	}
}

$(function() {
	ShopWishlist.init()
});