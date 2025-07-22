Object.defineProperty(exports, "__esModule", {
  value: true,
});

// Customizable Area Start
exports.addAddressAPiEndPoint = "/bx_block_address/addresses";
exports.addAddressApiMethod = "POST";
exports.deleteAddressApiMethod = "DELETE"
exports.updateAddressApiMethod = "PUT"

exports.addAddressApiContentType = "application/json";

exports.getAddressApiEndPoint = "/bx_block_address/addresses";
exports.assignAddress = 'bx_block_order_management/orders/add_address_to_order';
exports.assignAdderssToChat = "/bx_block_chat/add_address_to_order_request?address_id="
exports.getAddressApiMethod = "GET";
exports.getAddressApiContentType = "application/json";

exports.txtAddAddressTitle = "Add Address";
exports.txtLabelAddress = "Address";
exports.txtLabelAddressType = "Address Type";

exports.txtLabelLat = "Latitude";
exports.txtLabelLng = "Longitude";

exports.errorTitle = "Error";

exports.btnAdd = "Add";
exports.zipcodeRegex = /^\d+$/;
exports.btnExampleTitle = "CLICK ME";
exports.countryCodeApiEndpoint = "accounts/country_code_and_flags";
exports.countryCodeApiMethod = "GET";
exports.getEditAddressApiEndPoint = "bx_block_custom_form/index";
exports.getStateApiCallEndPoint = "bx_block_custom_form/all_states";
exports.getCityByStateApiEndPoint = "bx_block_custom_form/cities?state=";
exports.updateAegencyAddressApiEndPoint = "bx_block_custom_form/register_agency";
exports.updateDriverAddressApiEndPoint = "bx_block_custom_form/driver_personal_info";
exports.updateAddressSuccessMsg = "Address has been updated successfully"
// Customizable Area End
