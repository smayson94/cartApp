
	const products = [] || '';
	let cartData;

document.addEventListener("DOMContentLoaded", function(event) { 


	$.getJSON('https://gopuff-public.s3.amazonaws.com/dev-assignments/product/order.json').done(function(data){
		cartData = data;
		getCartProducts();
		console.log(cartData);
	});

 //    // get product info from cart
	// for (i = 0; i < cartData.cart.products.length; i++) {
	// 	let product_id = cartData.cart.products[i].id;
	// 	$.getJSON(`https://prodcat.gopuff.com/api/products?location_id=-1&product_id=${product_id}`).done(function(productData){
	// 		products.push(productData);
	// 	});
	// }

	const getCartProducts = () => {
		for (i = 0; i < cartData.cart.products.length; i++) {
			let product_id = cartData.cart.products[i].id;
			$.getJSON(`https://prodcat.gopuff.com/api/products?location_id=-1&product_id=${product_id}`).done(function(productData){
				products.push(productData);
			});
		}
	}

	const insertCartRow = (unitPrice, quantity, productImage, productTitle, productDescription) => {
		var cartRow = document.createElement('div');
		cartRow.setAttribute('class', 'item');
		cartRow.innerHTML = `
			    <div class="buttons">
			      <span class="delete-btn"></span>
			    </div>
			 
			    <div class="image">
			      <img src="${productImage}" alt="" />
			    </div>
			 
			    <div class="description">
			      <span>${productTitle}</span>
			      <span>${productDescription}</span>
			    </div>
			 
			    <div class="quantity">
			      <button class="plus-btn" type="button" name="button">
			        <img src="plus.svg" alt="" />
			      </button>
			      <input type="text" name="name" value="${quantity}">
			      <button class="minus-btn" type="button" name="button">
			        <img src="" alt="" />
			      </button>
			    </div>
			 
			    <div class="total-price">${unitPrice}</div>`;
		document.getElementById('cartContainer').appendChild(cartRow);
	}

	const initCartRow = () => {

		let quantitiy, unitPrice, totalPrice, productImage;
		for (i = 0; i < cartData.cart.products.length; i++) {
				if (products.length){
					quantity = cartData.cart.products[i].quantity;
					unitPrice = cartData.cart.products[i].price;
					productImage = products[i].products[0].avatar.small;
					productTitle = products[i].products[0].name;
					productDescription = products[i].products[0].description || "";
					insertCartRow(unitPrice, quantity, productImage, productTitle, productDescription);
				}
		}
	}

	setTimeout(initCartRow, 3000);
});

