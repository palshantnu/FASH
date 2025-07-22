Object.defineProperty(exports, '__esModule', {
  value: true
})

// Customizable Area Start
exports.apiContentType = 'application/json'
exports.getApiMethod = 'GET'
exports.postApiMethod = 'POST'
exports.deleteApiMethod = 'DELETE'
exports.putApiMethod = 'PUT'

exports.promoPlaceHolder = "Enter Promo Code";
exports.confirmationTitle = "Confirmation";

exports.getOrdersApiEndPoint = 'shopping_cart/orders'
exports.createOrderItemApiEndPoint = 'shopping_cart/order_items'
exports.deleteOrderItemApiEndPoint = 'shopping_cart/orders'
exports.getCartItemsEndpoint = 'bx_block_order_management/orders/get_active_cart'
exports.getBuyNowCartApiEndpoint="/bx_block_order_management/orders/get_buy_now?order_id=";
exports.getCartApiEndpoint = 'bx_block_order_management/orders/get_active_cart'
exports.getGuestCartApiEndpoint = 'bx_block_order_management/orders/get_active_cart_view'
exports.updateItemApiEndpoint = 'bx_block_order_management/orders/update_cart_item_quantity'
exports.removeItemFromCartEndPoint = 'bx_block_order_management/orders/remove_order_items'
exports.getAddressApiEndPoint = 'bx_block_address/addresses';
exports.assignAddress = 'bx_block_order_management/orders/add_address_to_order';
exports.placeOrder = 'bx_block_order_management/orders/update_status_to_placed?cart_id='
exports.createCharge = 'bx_block_tappaymentsintegration/tappayment/charges'

exports.errorTitle = 'Error'
exports.errorAllFieldsAreMandatory = 'All fields are mandatory.'
exports.orderItemNotFound = 'Can\'t find the catalogue item'
exports.ordersNotFound = 'One or more items not found to delete'
exports.errorStockLimitReached = 'Sorry, you can\'t add more of this catalogue'
exports.applyCouponEndpoint = 'bx_block_order_management/orders/apply_coupon';
exports.removeCouponEndpoint = 'bx_block_order_management/orders/remove_coupon?order_id=';
// Customizable Area End
