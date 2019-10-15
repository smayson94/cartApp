


document.addEventListener("DOMContentLoaded", function(event) { 


	const insertCartRow = (prodcutPrice, productQuantity) => {
		var cartRow = document.createElement('div');
		cartRow.setAttribute('class', 'post block bc2')
		cartRow.innerHTML = `
				<div class="cart-template-row col-sm-4 col-lg-12">
				    <h2 class="product-title">TITLE</h2>
				    <div class="panel panel-primary">
				    	<div class="product-id">Product ID</div>
				        <div class="product-price">${productPrice}</div>
				        <div class="product-quantity">${productQuantity}</div>
				  	</div>
		    	</div>`;
		document.getElementById('cartContainer').appendChild(cartRow);
	}

	const initCartRow = () => {
		let cartProducts
		$.getJSON('https://gopuff-public.s3.amazonaws.com/dev-assignments/product/order.json', function(data) {
		cartData = data;
		console.log(cartData);
		})

		let quantitiy, unitPrice, totalPrice;
		// for (i < 0; i < cartData.cart.products.length; i++) {
		// 	quantitiy = cartData.cart.products[i].qunatity;
		// 	unitPrice = cartData.cart.products[i].qunatity;
		// }
	}

	initCartRow()
});

