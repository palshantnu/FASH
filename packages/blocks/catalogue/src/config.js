Object.defineProperty(exports, "__esModule", {
  value: true
});

// Customizable Area Start
exports.getCategoriesApiMethod="GET";
exports.getSubCategoriesApiMethod="GET"
exports.apiMethodTypeGet = "GET";
exports.getColorListMethod="GET";
exports.getSizeApiMethod="GET";
exports.getStoresApiMethod="GET";
exports.createVarientMethod="GET";
exports.postMethod="POST";
exports.exampleAPiMethod = "POST";
exports.patchAPiMethod = "PATCH";
exports.updatePutMethod="PUT";
exports.getExampleMethod="GET";
exports.deleteMethod = "DELETE";
exports.getProductByStylistEndpoint = "bx_block_catalogue/catalogues/list_stylist_catalogues?stylist_id=";
exports.productApiContentType = "application/json";
exports.getCategoriesApiContentType="application/json";
exports.getSubCategoriesApiContentType="application/json";
exports.getColorListApiContentType="application/json";
exports.getSizeApiContentType="application/json";
exports.createVarientContentType="application/json";
exports.createCatalougueApiContentType="multipart/form-data";
exports.getSkuValidationEndPoint="bx_block_catalogue/catalogues_variants/check_sku_availability?variant_skus=";
exports.updateCatalougueApiContentType="multipart/form-data";
exports.exampleApiContentType = "application/json";

exports.CSVFileUploadEndPoint = "bx_block_catalogue/catalogues/upload_bulk_catalogues";
exports.productAPiEndPoint = "bx_block_catalogue/catalogues/catalogue_buyer";
exports.catalogueListEndpoint = "bx_block_catalogue/catalogues";
exports.getCategoriesApiEndPoint="bx_block_categories/categories";
exports.getSubCategoriesApiEndPoint="bx_block_categories/sub_categories?category_ids=";
exports.getColorListApiEndPoint="bx_block_catalogue/catalogues_variants_colors";
exports.getSizeApiEndPoint="bx_block_catalogue/catalogues_variants_sizes";
exports.createVarientEndPoint="bx_block_catalogue/catalogues/list_variants?";
exports.getPreoductNameExistingEndPoint="bx_block_catalogue/catalogues/find_catalogue_by_name?name="
exports.postCreateCatalougeApiEndPoint="bx_block_catalogue/catalogues";
exports.getSubSubCategoriesApiEndPoint="bx_block_categories/sub_sub_categories?sub_category_id=";
exports.updateCatalogueApiEndPoint="bx_block_catalogue/catalogues/";
exports.getCatalogueByStore="/bx_block_catalogue/catalogues/get_catalogue_by_store"
exports.getAllStoreApiEndPoint="accounts/bussiness/seller_store?approved=true"
exports.getStoresApiEndPoint="accounts/bussiness/buyer_store?only_store_name=true"
exports.getBySearchAndFilterApiEndPoint="bx_block_catalogue/catalogues/catalogue_buyer"

exports.loginAlertMessage = "Please login again.";
exports.somethingWentWrongMsg="Something went wrong";
exports.assignStoreEndpoint =
  "bx_block_catalogue/catalogues";

exports.addWishlistEndpoint = "bx_block_favourites/favourites";
exports.remWishlistEndpoint =
  "bx_block_favourites/favourites/destroy_by_favouritable?favouriteable_id=";
exports.selectPlan = "accounts/service"
exports.stylistCustomFormEndPoint="bx_block_custom_form/stylist_custom_accounts";
// Customizable Area End