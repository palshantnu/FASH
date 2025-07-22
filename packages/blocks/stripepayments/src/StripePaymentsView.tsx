import * as React from "react";
// Customizable Area Start
import { StyleSheet, Text, TouchableOpacity, View, Modal } from "react-native";
import MaskInput, { Masks } from "react-native-mask-input";
import RadioGroup from "./RadioGroup";
import { expiryDateMask } from "./utils";
// Customizable Area End
import { configJSON, ViewProps } from "./StripePayments";

const StripePaymentsView: React.FC<ViewProps> = ({
  // Customizable Area Start
  testID,
  isPaymentMethodsLoading,
  paymentMethods,
  infoText,
  modalProps,
  errorModalProps,
  orderIdInputProps,
  cardNumberInputProps,
  expiryDateInputProps,
  cvcInputProps,
  btnCreatePaymentMethodProps,
  btnCancelProps,
  btnAddPaymentMethodProps,
  btnConfirmPaymentProps,
  btnOkProps,
  radioGroupProps,
  // Customizable Area End
}) => {
  return (
    // Customizable Area Start
    <View style={styles.container}>
      <>
        <View testID={testID}>
          <View style={styles.orderIdView}>
            <Text>{configJSON.orderId}</Text>
            <MaskInput
              style={styles.input}
              keyboardType="numeric"
              value={orderIdInputProps.value}
              onChangeText={orderIdInputProps.onChangeText}
            />
          </View>
          {isPaymentMethodsLoading ? (
            <Text>{configJSON.loading}</Text>
          ) : paymentMethods.length ? (
            <RadioGroup
              items={paymentMethods}
              selectedId={radioGroupProps.selectedId}
              onSelect={radioGroupProps.onSelect}
            />
          ) : (
            <Text>{infoText}</Text>
          )}
          <View style={styles.addPaymentMethodView}>
            <TouchableOpacity
              style={styles.addPaymentMethodButton}
              disabled={btnAddPaymentMethodProps.disabled}
              onPress={btnAddPaymentMethodProps.onPress}
            >
              <Text>{configJSON.addPaymentMethod}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.confirmPaymentButton}
            disabled={btnConfirmPaymentProps.disabled}
            onPress={btnConfirmPaymentProps.onPress}
          >
            <Text style={styles.confirmPaymentText}>
              {configJSON.completePayment}
            </Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalProps.visible}
          onRequestClose={modalProps.onRequestClose}
        >
          <View testID="ModalContent" style={styles.centeredView}>
            <View style={styles.modalView}>
              <View>
                <Text>{configJSON.cardNumberLabel}</Text>
                <MaskInput
                  placeholder={configJSON.cardNumberPlaceholder}
                  style={styles.input}
                  mask={Masks.CREDIT_CARD}
                  keyboardType="numeric"
                  value={cardNumberInputProps.value}
                  onChangeText={cardNumberInputProps.onChangeText}
                />
              </View>
              <View style={styles.expiryDateAndCvcView}>
                <View style={styles.expiryDateView}>
                  <Text>{configJSON.expiryDateLabel}</Text>
                  <MaskInput
                    placeholder={configJSON.expiryDatePlaceholder}
                    style={styles.input}
                    keyboardType="numeric"
                    mask={expiryDateMask}
                    value={expiryDateInputProps.value}
                    onChangeText={expiryDateInputProps.onChangeText}
                  />
                </View>
                <View style={styles.cvcView}>
                  <Text>{configJSON.cvcLabel}</Text>
                  <MaskInput
                    placeholder={configJSON.cvcPlaceholder}
                    style={styles.input}
                    keyboardType="numeric"
                    mask={[/\d/, /\d/, /\d/]}
                    value={cvcInputProps.value}
                    onChangeText={cvcInputProps.onChangeText}
                  />
                </View>
              </View>
              <View style={styles.modalAction}>
                <TouchableOpacity
                  testID="SubmitButton"
                  style={styles.submitButton}
                  disabled={btnCreatePaymentMethodProps.disabled}
                  onPress={btnCreatePaymentMethodProps.onPress}
                >
                  <Text style={styles.modalActionButtonText}>
                    {configJSON.submitText}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  testID="CancelButton"
                  disabled={btnCancelProps.disabled}
                  onPress={btnCancelProps.onPress}
                >
                  <Text style={styles.modalActionButtonText}>
                    {configJSON.cancelText}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={errorModalProps.visible}
            onRequestClose={errorModalProps.onRequestClose}
          >
            <View testID="ErrorModalContent" style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text>{errorModalProps.message}</Text>
                <View style={styles.modalAction}>
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={btnOkProps.onPress}
                  >
                    <Text style={styles.modalActionButtonText}>
                      {configJSON.ok}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={errorModalProps.visible}
          onRequestClose={errorModalProps.onRequestClose}
        >
          <View testID="ErrorModalContent" style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>{errorModalProps.message}</Text>
              <View style={styles.modalAction}>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={btnOkProps.onPress}
                >
                  <Text style={styles.modalActionButtonText}>
                    {configJSON.ok}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </>
    </View>
    // Customizable Area End
  );
};

const styles = StyleSheet.create({
  // Customizable Area Start
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  orderIdView: {
    marginBottom: 12,
  },
  input: {
    fontSize: 18,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 4,
    borderColor: "#999",
  },
  addPaymentMethodView: {
    marginTop: 12,
  },
  addPaymentMethodButton: {
    marginLeft: "auto",
    marginBottom: 16,
  },
  confirmPaymentButton: {
    backgroundColor: "#6200EE",
    padding: 12,
    borderRadius: 4,
  },
  confirmPaymentText: {
    color: "#fff",
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  expiryDateAndCvcView: {
    flexDirection: "row",
    marginTop: 16,
  },
  expiryDateView: {
    flex: 1,
    marginRight: 8,
  },
  cvcView: {
    flex: 1,
    marginRight: 8,
  },
  modalAction: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  modalActionButtonText: {
    color: "#fff",
  },
  submitButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 4,
    backgroundColor: "#6200EE",
  },
  cancelButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: "#FF0000",
  },
  // Customizable Area End
});

export default StripePaymentsView;
