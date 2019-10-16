
const products = [] || '';
let cartData;

document.addEventListener("DOMContentLoaded", (event) => { 
	// get product order JSON
	$.getJSON('https://gopuff-public.s3.amazonaws.com/dev-assignments/product/order.json').done((data)=>{
		cartData = data;
		getCartProducts();
		console.log(cartData);
	});

	// get product info from Cart with goPuff API
	const getCartProducts = () => {
		for (i = 0; i < cartData.cart.products.length; i++) {
			let product_id = cartData.cart.products[i].id;
			$.getJSON(`https://prodcat.gopuff.com/api/products?location_id=-1&product_id=${product_id}`)
					.done((productData) =>{
				products.push(productData);
			});
		}
	}

	// const bindCartButtons = () => {
	// 	let deleteButtons = $('delete-btn');
	// 	for (i=0; i < deleteButtons.length; i++) {
	// }

	// insert cart Row for Each Product
	const insertCartRow = (unitPrice, quantity, productImage, productTitle, productDescription) => {
		var cartRow = document.createElement('div');
		cartRow.setAttribute('class', 'item');
		cartRow.innerHTML = `
			    <div class="buttons">
			      <span class="delete-btn"></span>
			    </div>
			 
			    <div class="image">
			      <img src="${productImage}"/>
			    </div>
			 
			    <div class="description">
			      <span>${productTitle}</span>
			    </div>
			
			    <div class="quantity">
			      <button class="plus-btn" type="button" name="button">
			        <img src="plus.svg"/>
			      </button>
			      <input type="text" name="name" value="${quantity}">
			      <button class="minus-btn" type="button" name="button">
			        <img src="minus.svg"/>
			      </button>
			    </div>
			 
			    <div class="total-price">${unitPrice}</div>`;
		$('#cartContainer')[0].appendChild(cartRow);
	}

	// build Cart
	const initCart = () => {
		let quantitiy, unitPrice, totalPrice, productImage;
		let priceCounter = 0;
		for (i = 0; i < cartData.cart.products.length; i++) {
				if (products.length){
					quantity = cartData.cart.products[i].quantity;
					unitPrice = cartData.cart.products[i].price;
					productImage = products[i].products[0].avatar.small;
					productTitle = products[i].products[0].name;
					productDescription = products[i].products[0].description || "";
					insertCartRow(unitPrice, quantity, productImage, productTitle, productDescription);
					totalPrice = priceCounter + (unitPrice * quantity);
					priceCounter = totalPrice;
				}
		}
		$('#totalPrice')[0].innerHTML = "Total: " + priceCounter.toFixed(2);
	}

	setTimeout(initCart, 2000);

});

