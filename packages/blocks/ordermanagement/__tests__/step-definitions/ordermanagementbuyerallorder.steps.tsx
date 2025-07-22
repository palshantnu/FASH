import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import { jest,beforeEach, expect } from '@jest/globals';
import OrderManagementBuyerAllOrder from "../../src/OrderManagementBuyerAllOrder";

const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        getParam: (playlist_id: any,topic_id:any) => {
        },
        addListener:(param:string,callback:any)=>{
          callback()
        },
    },
  id: "OrderManagementBuyerAllOrder",
};

const orderArrObjectApi={
  data:[
    {id:'1',
    attributes:{
      order_number:'765HYFGIQWERU',order_date:'12 sep 2023',status:'Processing',
        order_items:[
            {id:'1',attributes:{
              quantity: 2,
              catalogue_name: "shirt6 ",
              catalogue_variant_color: "Grey",
              catalogue_variant_size: "Small",
              catalogue_variant_front_image:null,
            }},
            {id:'2',attributes:{
              quantity: 1,
              catalogue_name: "shirt6 ",
              catalogue_variant_color: "Grey",
              catalogue_variant_size: "Small",
              catalogue_variant_front_image:null,
            }},
        ],
        delivery_addresses:{
          id: "7",
          attributes: {
              name: "Shirley Setia",
              street: "A.B. Road",
              zip_code: "125123",
              area: "Vijay Nagar",
              block: "D",
              city: "Bhopal",
              house_or_building_number: "207",
          }
        },
        placed_at:'2024-04-15T11:43:18.903Z'
      }
    },
    {id:'2',attributes:{
      order_number:'765HYAFGIWERU',order_date:'12 sep 2023',status:'Delivered',
      order_items:[
            {id:'1',attributes:{
              quantity: 4,
              catalogue_name: "shirt6 ",
              catalogue_variant_color: "Grey",
              catalogue_variant_size: "Small",
              catalogue_variant_front_image:null,
            }},
            {id:'2',attributes:{
              quantity: 1,
              catalogue_name: "shirt6 ",
              catalogue_variant_color: "Grey",
              catalogue_variant_size: "Small",
              catalogue_variant_front_image:null,
            }},
        ],
        delivery_addresses:{
          id: "5",
          attributes: {
              name: "Shirley Setia",
              street: "A.B. Road",
              zip_code: "125133",
              area: "Vijay Nagar",
              block: "D",
              city: "Bhopal",
              house_or_building_number: "207",
          }
        },
        placed_at:'2024-04-15T11:43:18.903Z'
      }
    }
  ]
}

const orderArrObject=[
  {id:'1',
  attributes:{
    order_number:'765HYFGIQWERU',order_date:'12 sep 2023',status:'Processing',
      order_items:[
          {id:'1',attributes:{
            quantity: 2,
            catalogue_name: "shirt6 ",
            catalogue_variant_color: "Grey",
            catalogue_variant_size: "Small",
            catalogue_variant_front_image:null,
          }},
          {id:'2',attributes:{
            quantity: 1,
            catalogue_name: "shirt6 ",
            catalogue_variant_color: "Grey",
            catalogue_variant_size: "Small",
            catalogue_variant_front_image:null,
          }},
      ],
      delivery_addresses:{
        id: "7",
        attributes: {
            name: "Shirley Setia",
            street: "A.B. Road",
            zip_code: "125123",
            area: "Vijay Nagar",
            block: "D",
            city: "Bhopal",
            house_or_building_number: "207",
        }
      },
      placed_at:'2024-04-15T11:43:18.903Z'
    }
  },
  {id:'2',attributes:{
    order_number:'765HYAFGIWERU',order_date:'12 sep 2023',status:'Delivered_abc',
    order_items:[
          {id:'1',attributes:{
            quantity: 4,
            catalogue_name: "shirt6 ",
            catalogue_variant_color: "Grey",
            catalogue_variant_size: "Small",
            catalogue_variant_front_image:null,
          }},
          {id:'2',attributes:{
            quantity: 1,
            catalogue_name: "shirt6 ",
            catalogue_variant_color: "Grey",
            catalogue_variant_size: "Small",
            catalogue_variant_front_image:null,
          }},
      ],
      delivery_addresses:{
        id: "5",
        attributes: {
            name: "Shirley Setia",
            street: "A.B. Road",
            zip_code: "125133",
            area: "Vijay Nagar",
            block: "D",
            city: "Bhopal",
            house_or_building_number: "207",
        }
      },
      placed_at:'2024-04-15T11:43:18.903Z'
    }
  }
]

const feature = loadFeature("./__tests__/features/ordermanagementbuyerallorder-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "");
  });

  test("User navigates to ordermanagementbuyerallorder", ({ given, when, then }) => {
    let ordermanagementbuyerallorderBlock: ShallowWrapper;
    let orderBuyerInstance: OrderManagementBuyerAllOrder;

    given("I am a User loading ordermanagementbuyerallorder", () => {
      ordermanagementbuyerallorderBlock = shallow(<OrderManagementBuyerAllOrder {...screenProps} />);
    });

    when("I navigate to the ordermanagementbuyerallorder", () => {
      orderBuyerInstance = ordermanagementbuyerallorderBlock.instance() as OrderManagementBuyerAllOrder;
    });

    then("ordermanagementbuyerallorder will load with out errors", () => {
        const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
        tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
        runEngine.sendMessage("Unit Test", tokenMsg);
        expect(tokenMsg).toBeTruthy();
    });

    then("I can back button with out errors", () => {
      let buttonComponent = ordermanagementbuyerallorderBlock.findWhere(
        (node) => node.prop("testID") === "btnBackAllOrder"
      );
      buttonComponent.simulate("press");
      expect(buttonComponent).toBeTruthy();
    });

    then("I can navigation payload with out errors", async () => {
        const msgPlayloadAPI = new Message(getName(MessageEnum.NavigationPayLoadMessage))
        msgPlayloadAPI.addData(getName(MessageEnum.OrderTypeNavigationPayloadMessage), "Processing");
        runEngine.sendMessage("Unit Test", msgPlayloadAPI)

        const msgPlayloadAPIToken = new Message(getName(MessageEnum.NavigationPayLoadMessage))
        msgPlayloadAPIToken.addData(getName(MessageEnum.navigationTokenMessage), 'token');
        runEngine.sendMessage("Unit Test", msgPlayloadAPIToken)
        expect(msgPlayloadAPI).toBeTruthy()
    })

    then("I can show all order api work with out errors", async () => {
        const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),orderArrObjectApi);

        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
        orderBuyerInstance.getBuyerAllOrderApiCallId = getCategoryMessage.messageId
        runEngine.sendMessage("Unit Test", getCategoryMessage);
        expect(getCategoryMessage).toBeTruthy()
    })

    then("I can show all order flatlist by render with out errors", async () => {
        let render_item = ordermanagementbuyerallorderBlock.findWhere(
        (node) => node.prop("testID") === "orderAllStatusDataList"
        );
        let render_data = render_item.renderProp("renderItem")({item: orderArrObject[0],index: 0,});
        render_item.renderProp("ItemSeparatorComponent")({})
        render_item.renderProp("ListEmptyComponent")({})
        render_item.renderProp("keyExtractor")({id:0})
        const buttonNavigate = render_data.findWhere(
          (node) => node.prop("testID") == "btnOrderDetailRedirect"
        )
        buttonNavigate.simulate("press")
        expect(render_data).toBeTruthy();

        let renderAnother = render_data.findWhere((node) => node.prop("testID") === "orderAllItemStatusDataList");
        renderAnother.renderProp("renderItem")({item: orderArrObject[0],index: 0,});
        renderAnother.renderProp("keyExtractor")({id:0})
    });

    then("I can enter text order for search with out errors", () => {
        let textInputComponent = ordermanagementbuyerallorderBlock.findWhere(
          (node) => node.prop("testID") === "txt_enter_order"
        );
        textInputComponent.simulate("changeText", "0000000123");
        textInputComponent.simulate("submitEditing");
        expect(textInputComponent).toBeTruthy();
    });

    then("I can show all order api work with errors", async () => {
      const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
      getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{
        errors:{
          'message':'Invalid Token'
        }
      });

      getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
      orderBuyerInstance.getBuyerAllOrderApiCallId = getCategoryMessage.messageId
      runEngine.sendMessage("Unit Test", getCategoryMessage);
      expect(getCategoryMessage).toBeTruthy()
      orderBuyerInstance.setState({languageOrder:'en'});
      orderBuyerInstance.getBuyerAllOrder()
    })
  });
});
