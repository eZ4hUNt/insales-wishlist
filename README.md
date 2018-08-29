# Мод "Добавить в избранное" для InSales
1. Добавить в карточку товара 
```
		{% if client %}
			<div class="btn-wishlist wishlist_add" data-wishlist-add="{{ product.id }}" title="Добавить в избранное">
				<i class="fa fa-heart-o w-list-icon" aria-hidden="true"></i>
			</div>

			<div class="btn-wishlist wishlist_delete" data-wishlist-delete="{{ product.id }}" title="Удалить из избранного">
				<i class="fa fa-heart w-list-icon" aria-hidden="true"></i>
			</div>
		{% else %}
			<a href="/account/login" class="btn-wishlist" ><i class="fa fa-heart-o w-list-icon" aria-hidden="true"></i></a>
		{% endif %}
```
2. Подключаем *"wishlist.js"*
3. Создаем страницу с шаблоном *"page.wishlist.liquid"*
4. Загружаем шаблон *"page.wishlist.liquid"* и правим по своему усмотрению
5. Добавляем в массив *"Site"* параметр *"client_login"*
```
		Site = _.merge({}, Site, {
			.....
			client_login: '{{ client }}',
			.....
```
			
6. Добавить стили
```
    .btn-wishlist{
      margin-left: 15px;
      margin-top: 0;
      padding: 5px 0;
	  cursor:pointer;
	}
	.btn-wishlist.active {
		display:none;
	}
	.btn-wishlist .fa {
		font-size: 20px;
    }
	.btn-wishlist.wishlist_add.active + .btn-wishlist.wishlist_delete {
		display: inline-block;
	}
	.btn-wishlist.wishlist_delete {
		display: none;
	}
```
## Сам скрипт и пример на GitHub
https://github.com/eZ4hUNt/insales-wishlist/

Пример: https://makeuptrendstore.ru/
