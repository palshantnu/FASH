Object.defineProperty(exports, "__esModule", {
  value: true
});

// Customizable Area Start
exports.errorTitle = "Error";

exports.apiVerifyOtpContentType = "application/json";
exports.apiVerifyOtpEndPoint =
  "account/accounts/sms_confirmation?pin=";

exports.resendOtpEndPoint = "account_block/accounts/resend_account_otp";
exports.otpVerifyEndPoint = "accounts/verify_otps";

exports.apiVerifyForgotPasswordOtpEndPoint =
  "forgot_password/otp_confirmation";

exports.apiVerifyOtpMethod = "POST";

exports.errorOtpNotValid = "Incorrect OTP, please try again or resend the code.";

exports.btnTxtSubmitOtp = "Submit otp";

exports.placeHolderOtp = "OTP";

exports.labelInfo =
  "We Just sent a 4 digits OTP to phone. Enter your OTP code below.";

exports.submitButtonColor = "#6200EE";
// Customizable Area End