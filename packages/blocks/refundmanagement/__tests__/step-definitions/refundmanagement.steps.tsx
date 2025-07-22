import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import Refundmanagement from "../../src/Refundmanagement"
const responce='{"data":{"id":"1085","type":"order_seller","attributes":{"order_number":"OD00000219","account":"buyer tin","order_item_count":1,"sub_total":"1000.0","total":"1180.0","status":"delivered","placed_at":"2024-07-19T07:41:56.577Z","confirmed_at":"2024-07-19T07:42:29.176Z","in_transit_at":"2024-07-19T07:49:07.407Z","delivered_at":"2024-07-19T07:50:54.284Z","process_at":"2024-07-19T07:42:40.077Z","shipped_at":"2024-07-19T07:48:58.595Z","return_at":null,"return_cancel_at":null,"return_pick_at":null,"cancelled_at":null,"cancellation_reason":null,"rejected_at":null,"refunded_at":null,"returned_at":null,"deliver_by":null,"order_status_id":2,"created_at":"2024-07-19T07:41:04.999Z","updated_at":"2024-07-19T07:50:54.289Z","order_deliver_date":null,"order_deliver_time":null,"delivery_addresses":{"id":"598","type":"delivery_address","attributes":{"name":"buyertin","country_code":"+965","phone_number":"22006535","contact_number":"+96522006539","street":"Devarshi Plazaa, gam, Rajeswari Society, Isanpur, Ahmedabad, Gujarat 382443, India","zip_code":"382443","area":"isanpur","block":"A","city":null,"house_or_building_number":"10","address_name":"Office","is_default":true,"latitude":22.9797818,"longitude":72.5968795}},"order_return_date":null,"order_return_time":null,"return_placed_at":null,"return_confirmed_at":null,"return_reject_at":null,"returned_assign_at":null,"order_items":[{"id":"1453","type":"order_item_seller","attributes":{"status":"delivered","placed_at":"2024-07-19T07:41:56.779Z","confirmed_at":"2024-07-19T07:42:28.703Z","in_transit_at":"2024-07-19T07:49:07.376Z","delivered_at":"2024-07-19T07:50:54.169Z","cancelled_at":null,"rejected_at":null,"process_at":"2024-07-19T07:42:39.994Z","shipped_at":"2024-07-19T07:48:58.557Z","return_at":null,"return_cancel_at":null,"return_pick_at":null,"return_placed_at":null,"return_confirmed_at":null,"return_reject_at":null,"returned_assign_at":null,"quantity":1,"unit_price":"1000.0","total_price":"1000.0","reason_of_rejection":null,"catalogue_name":"Monsoon tops","brand_name":"nike","catalogue_variant_color":"Grey","catalogue_variant_sku":"A1","store_name":"Neon","catalogue_variant_size":"Small","catalogue_variant_front_image":"","catalogue_variant_back_image":"","catalogue_variant_side_image":"","driver_name":"driver tr","driver_latitude":22.9798736572266,"driver_longitude":72.5968192887439,"driver_phone_number":"96522004774","otp":null}}],"payment_detail":{"id":271,"status":"CAPTURED","created_at":"2024-07-19T07:41:56.570Z","updated_at":"2024-07-19T07:41:57.401Z","charge_id":"chg_TS03A5320241040k6H61907161","merchant_id":null,"order_id":"OD00000218","amount":1180,"currency":"KWD","customer_id":"cus_TS03A5820240750Ps7j1007961","reason":"","account_id":973,"order_management_order_id":1085,"refund_id":null,"refund_amount":null,"refund_reason":null,"seller_order_id":null,"last_four_card_digit":"0008","payment_type":"MASTERCARD","deleted":false},"buyer_latitude":null,"buyer_longitude":null}}}'
    const responceNew='{"id":"1453","type":"order_item_seller","attributes":{"status":"delivered","placed_at":"2024-07-19T07:41:56.779Z","confirmed_at":"2024-07-19T07:42:28.703Z","in_transit_at":"2024-07-19T07:49:07.376Z","delivered_at":"2024-07-19T07:50:54.169Z","cancelled_at":null,"rejected_at":null,"process_at":"2024-07-19T07:42:39.994Z","shipped_at":"2024-07-19T07:48:58.557Z","return_at":null,"return_cancel_at":null,"return_pick_at":null,"return_placed_at":null,"return_confirmed_at":null,"return_reject_at":null,"returned_assign_at":null,"quantity":1,"unit_price":"1000.0","total_price":"1000.0","reason_of_rejection":null,"catalogue_name":"Monsoon tops","brand_name":"nike","catalogue_variant_color":"Grey","catalogue_variant_sku":"A1","store_name":"Neon","catalogue_variant_size":"Small","catalogue_variant_front_image":"","catalogue_variant_back_image":"","catalogue_variant_side_image":"","driver_name":"driver tr","driver_latitude":22.9798736572266,"driver_longitude":72.5968192887439,"driver_phone_number":"96522004774","otp":null}}'
    const responceData='{"data":{"id":"1085","type":"order_seller","attributes":{"order_number":"OD00000218","account":"buyer tin","order_item_count":1,"sub_total":"1000.0","total":"1180.0","status":"delivered","placed_at":"2024-07-19T07:41:56.577Z","confirmed_at":"2024-07-19T07:42:29.176Z","in_transit_at":"2024-07-19T07:49:07.407Z","delivered_at":"2024-07-19T07:50:54.284Z","process_at":"2024-07-19T07:42:40.077Z","shipped_at":"2024-07-19T07:48:58.595Z","return_at":null,"return_cancel_at":null,"return_pick_at":null,"cancelled_at":null,"cancellation_reason":null,"rejected_at":null,"refunded_at":null,"returned_at":null,"deliver_by":null,"order_status_id":2,"created_at":"2024-07-19T07:41:04.999Z","updated_at":"2024-07-19T07:50:54.289Z","order_deliver_date":null,"order_deliver_time":null,"delivery_addresses":{"id":"598","type":"delivery_address","attributes":{"name":"buyertin","country_code":"+965","phone_number":"22006535","contact_number":"+96522006535","street":"Devarshi Plaza, gam, Rajeswari Society, Isanpur, Ahmedabad, Gujarat 382443, India","zip_code":"382443","area":"isanpur","block":"A","city":null,"house_or_building_number":"10","address_name":"Office","is_default":true,"latitude":22.9797818,"longitude":72.5968795}},"order_return_date":null,"order_return_time":null,"return_placed_at":null,"return_confirmed_at":null,"return_reject_at":null,"returned_assign_at":null,"order_items":[{"id":"1453","type":"order_item_seller","attributes":{"status":"delivered","placed_at":"2024-07-19T07:41:56.779Z","confirmed_at":"2024-07-19T07:42:28.703Z","in_transit_at":"2024-07-19T07:49:07.376Z","delivered_at":"2024-07-19T07:50:54.169Z","cancelled_at":null,"rejected_at":null,"process_at":"2024-07-19T07:42:39.994Z","shipped_at":"2024-07-19T07:48:58.557Z","return_at":null,"return_cancel_at":null,"return_pick_at":null,"return_placed_at":null,"return_confirmed_at":null,"return_reject_at":null,"returned_assign_at":null,"quantity":1,"unit_price":"1000.0","total_price":"1000.0","reason_of_rejection":null,"catalogue_name":"Monsoon tops","brand_name":"nike","catalogue_variant_color":"Grey","catalogue_variant_sku":"A1","store_name":"Neon","catalogue_variant_size":"Small","catalogue_variant_front_image":"","catalogue_variant_back_image":"","catalogue_variant_side_image":"","driver_name":"driver tr","driver_latitude":22.9798736572266,"driver_longitude":72.5968192887439,"driver_phone_number":"96522004774","otp":null}},{"id":"1453","type":"order_item_seller","attributes":{"status":"delivered","placed_at":"2024-07-19T07:41:56.779Z","confirmed_at":"2024-07-19T07:42:28.703Z","in_transit_at":"2024-07-19T07:49:07.376Z","delivered_at":"2024-07-19T07:50:54.169Z","cancelled_at":null,"rejected_at":null,"process_at":"2024-07-19T07:42:39.994Z","shipped_at":"2024-07-19T07:48:58.557Z","return_at":null,"return_cancel_at":null,"return_pick_at":null,"return_placed_at":null,"return_confirmed_at":null,"return_reject_at":null,"returned_assign_at":null,"quantity":1,"unit_price":"1000.0","total_price":"1000.0","reason_of_rejection":null,"catalogue_name":"Monsoon tops","brand_name":"nike","catalogue_variant_color":"Grey","catalogue_variant_sku":"A1","store_name":"Neon","catalogue_variant_size":"Small","catalogue_variant_front_image":"","catalogue_variant_back_image":"","catalogue_variant_side_image":"","driver_name":"driver tr","driver_latitude":22.9798736572266,"driver_longitude":72.5968192887439,"driver_phone_number":"96522004774","otp":null}} ],"payment_detail":{"id":271,"status":"CAPTURED","created_at":"2024-07-19T07:41:56.570Z","updated_at":"2024-07-19T07:41:57.401Z","charge_id":"chg_TS03A5320241040k6H61907161","merchant_id":null,"order_id":"OD00000218","amount":1180,"currency":"KWD","customer_id":"cus_TS03A5820240750Ps7j1007961","reason":"","account_id":973,"order_management_order_id":1085,"refund_id":null,"refund_amount":null,"refund_reason":null,"seller_order_id":null,"last_four_card_digit":"0008","payment_type":"MASTERCARD","deleted":false},"buyer_latitude":null,"buyer_longitude":null}}}'
    const responceNews='{"id":"1453","type":"order_item_seller","attributes":{"status":"delivered","placed_at":"2024-07-19T07:41:56.779Z","confirmed_at":"2024-07-19T07:42:28.703Z","in_transit_at":"2024-07-19T07:49:07.376Z","delivered_at":"2024-07-19T07:50:54.169Z","cancelled_at":null,"rejected_at":null,"process_at":"2024-07-19T07:42:39.994Z","shipped_at":"2024-07-19T07:48:58.557Z","return_at":null,"return_cancel_at":null,"return_pick_at":null,"return_placed_at":null,"return_confirmed_at":null,"return_reject_at":null,"returned_assign_at":null,"quantity":1,"unit_price":"1000.0","total_price":"1000.0","reason_of_rejection":null,"catalogue_name":"Monsoon tops","brand_name":"nike","catalogue_variant_color":"Grey","catalogue_variant_sku":"A1","store_name":"Neon","catalogue_variant_size":"Small","catalogue_variant_front_image":"","catalogue_variant_back_image":"","catalogue_variant_side_image":"","driver_name":"driver tr","driver_latitude":22.9798736572266,"driver_longitude":72.5968192887439,"driver_phone_number":"96522004774","otp":null}}'
       
const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        addListener: jest.fn().mockImplementation((event, callback: any) => {
          if (event === "focus") {
            callback();
          }
          if (event === "willFocus") {
            callback();
          }
          if (event === "didFocus") {
            callback();
          }
          if (event === "willBlur") {
            callback();
          }
          if (event === "didBlur") {
            callback();
          }
        }),
      },
    id: "Refundmanagement"
  }

const feature = loadFeature('./__tests__/features/refundmanagement-scenario.feature');

defineFeature(feature, (test) => {
        beforeEach(() => {
          
          jest.doMock("react-native", () => ({ Platform: { OS: "anndroid" } }));
          jest.spyOn(helpers, "getOS").mockImplementation(() => "android");
        });

    test('User navigates to refundmanagement', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:Refundmanagement; 
        
        given('I am a User loading refundmanagement', () => {
            exampleBlockA = shallow(<Refundmanagement {...screenProps}/>);
        });

        when('I navigate to the refundmanagement', () => {
             instance = exampleBlockA.instance() as Refundmanagement
        });

        then('refundmanagement will load with out errors', () => {
            const tokenMsgs: Message = new Message(getName(MessageEnum.NavigationPayLoadMessage));
            tokenMsgs.addData(getName(MessageEnum.LoginOptionsNavigationDataMessage), {type:"Stores",offer_id:1});
            runEngine.sendMessage("Unit Test", tokenMsgs);
            const sessionMessage = new Message(
                getName(MessageEnum.SessionResponseMessage)
              );
              sessionMessage.addData(
                getName(MessageEnum.SessionResponseToken),
                "token"
              );
              runEngine.sendMessage(sessionMessage.messageId, sessionMessage);
              const countryMessage = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              countryMessage.initializeFromObject({
                [getName(
                  MessageEnum.RestAPIResponceDataMessage
                )]: countryMessage.messageId,
                [getName(MessageEnum.RestAPIResponceSuccessMessage)]:JSON.parse(responce)});
             instance.getRefundApiCallId =
                countryMessage.messageId;
              runEngine.sendMessage(countryMessage.messageId, countryMessage);
              const CustomCheckBox = exampleBlockA.findWhere(
                (node) => node.prop("testID") == "allBtnCheckBox"
              )
              CustomCheckBox.simulate('press')
              const allBtnCheckBoxs = exampleBlockA.findWhere(
                (node) => node.prop("testID") == "allBtnCheckBox"
              )
              allBtnCheckBoxs.simulate('press')
              const flatlists = exampleBlockA.findWhere(
                (node) => node.prop("testID") === "cartItemsFlatList"
              )
              flatlists.renderProp("keyExtractor")("3");
              const renderItems = flatlists.renderProp("renderItem")({ item:JSON.parse(responceNew), index: 0 })
           
            const allBtnCheckBox0 = renderItems.findWhere(
                (node) => node.prop("testID") == "allBtnCheckBox0"
              )
              allBtnCheckBox0.simulate('press')
              const allBtnCheckBox = exampleBlockA.findWhere(
                (node) => node.prop("testID") == "allBtnCheckBox"
              )
              allBtnCheckBox.simulate('press')
              const CustomCheckBoxs = renderItems.findWhere(
                (node) => node.prop("testID") == "allBtnCheckBox0"
              )
              CustomCheckBoxs.simulate('press')
                 const buttonNavigates = flatlists.prop("ListFooterComponent")
buttonNavigates.props.children[1].props.onPress()
                
                
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can enter text with out errors', () => {
            let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputProductDescription');
      textInputComponent.simulate('changeText', '');
            const CustomCheckBoxsss = exampleBlockA.findWhere(
                    (node) => node.prop("testID") == "btnCancelOrderYes"
                  )
                  CustomCheckBoxsss.simulate('press')
                  let textInputComponents = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputProductDescription');
      textInputComponents.simulate('changeText', 'fffgf');
            const CustomCheckBoxssss = exampleBlockA.findWhere(
                    (node) => node.prop("testID") == "btnCancelOrderYes"
                  )
                  CustomCheckBoxssss.simulate('press')
                  const btnCancelOrderNo = exampleBlockA.findWhere(
                    (node) => node.prop("testID") == "btnCancelOrderNo"
                  )
                  btnCancelOrderNo.simulate('press')
        });

        then('I can select the button with with out errors', () => {
          let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputProductDescription');
          textInputComponent.simulate('changeText', '');
                const CustomCheckBoxsss = exampleBlockA.findWhere(
                        (node) => node.prop("testID") == "btnCancelOrderYes"
                      )
                      CustomCheckBoxsss.simulate('press')
                      let textInputComponents = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInputProductDescription');
          textInputComponents.simulate('changeText', 'fffgf');
                const CustomCheckBoxssss = exampleBlockA.findWhere(
                        (node) => node.prop("testID") == "btnCancelOrderYes"
                      )
                      CustomCheckBoxssss.simulate('press')
                      const btnCancelOrderNos = exampleBlockA.findWhere(
                        (node) => node.prop("testID") == "btnCancelOrderNo"
                      )
                      btnCancelOrderNos.simulate('press')
            const countryMessage = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              countryMessage.initializeFromObject({
                [getName(
                  MessageEnum.RestAPIResponceDataMessage
                )]: countryMessage.messageId,
                [getName(MessageEnum.RestAPIResponceSuccessMessage)]: JSON.parse(responce)}
              );
             instance.updateRefundApiCallId =
                countryMessage.messageId;
              runEngine.sendMessage(countryMessage.messageId, countryMessage);
              
            const btnCancelOrderNo = exampleBlockA.findWhere(
                (node) => node.prop("testID") == "btnBackCatalogue"
              )
              btnCancelOrderNo.simulate('press')
             
            
        });

        then('I can leave the screen with out errors', () => {
          const allBtnCheckBox = exampleBlockA.findWhere(
            (node) => node.prop("testID") == "allBtnCheckBox"
          )
          allBtnCheckBox.simulate('press')
          const flatlists = exampleBlockA.findWhere(
            (node) => node.prop("testID") === "cartItemsFlatList"
          )
          flatlists.renderProp("keyExtractor")("3");
         let renderItems= flatlists.renderProp("renderItem")({ item:JSON.parse(responceNews), index: 0 })
          const CustomCheckBoxs = renderItems.findWhere(
            (node) => node.prop("testID") == "allBtnCheckBox0"
          )
          CustomCheckBoxs.simulate('press')
          const CustomCheckBoxss = renderItems.findWhere(
            (node) => node.prop("testID") == "allBtnCheckBox0"
          )
          CustomCheckBoxss.simulate('press')
          const countryMessage = new Message(
            getName(MessageEnum.RestAPIResponceMessage)
          );
          countryMessage.initializeFromObject({
            [getName(
              MessageEnum.RestAPIResponceDataMessage
            )]: countryMessage.messageId,
            [getName(MessageEnum.RestAPIResponceSuccessMessage)]: JSON.parse(responceData)}
          );
         instance.getRefundApiCallId =
            countryMessage.messageId;
          runEngine.sendMessage(countryMessage.messageId, countryMessage);
          const CustomCheckBoxsss = renderItems.findWhere(
            (node) => node.prop("testID") == "allBtnCheckBox0"
          )
          CustomCheckBoxsss.simulate('press')
          const CustomCheckBoxssSss = renderItems.findWhere(
            (node) => node.prop("testID") == "allBtnCheckBox0"
          )
          CustomCheckBoxssSss.simulate('press')
             const buttonNavigates = flatlists.prop("ListFooterComponent")
buttonNavigates.props.children[1].props.onPress()
const buttonNavigatess = flatlists.prop("ListFooterComponent")
buttonNavigatess.props.children[1].props.onPress()
const buttonNavigatesss = flatlists.prop("ListFooterComponent")
buttonNavigatesss.props.children[1].props.onPress()
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
