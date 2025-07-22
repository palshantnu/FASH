Object.defineProperty(exports, "__esModule", {
  value: true
});

// Customizable Area Start
exports.httpGetType = "GET";
exports.httpPostType = "POST";
exports.httpDeleteType = "DELETE";

exports.categoryApiContentType = "application/json";
exports.categoryAPIEndPoint = "bx_block_categories/categories";
exports.categoryByStoreIdEndpoint =
  "/bx_block_catalogue/catalogues/get_category_by_store";
exports.subCategoryAPIEndPoint = "bx_block_categories/sub_categories";
exports.subSubCategoryAPIEndPoint = "bx_block_categories/sub_sub_categories";
exports.shopAPIEndPoint = "accounts/bussiness/buyer_store";

exports.errorTitle = "Error";
exports.errorAllFieldsAreMandatory = "Please enter a category first";
exports.errorCategory = "Please select a category first";
exports.getProfileEndpoints ="account_block/accounts/user_detail"

// Customizable Area End