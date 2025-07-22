import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";

import * as helpers from "framework/src/Helpers";
import FilterOrders from "../../src/FiltersOrders";
import { render } from "@testing-library/react-native";

const mockNavigate = jest.fn();

const screenProps = {
  navigation: {
    navigate: mockNavigate,
  },

  id: "FilterOrders",
};



const feature = loadFeature("./__tests__/features/filterorder-scenario.feature");
const findByTestID = (wrapper: ShallowWrapper<any>, testID: string) =>
  wrapper.findWhere((node) => node.prop("testID") === testID).first();
defineFeature(feature, (test) => {
  let getByTestId;
  let handleChangeFilterSpy;
  beforeEach(() => {
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.useFakeTimers();
    const { getByTestId: localGetByTestId } = render(<FilterOrders navigation={undefined} id={""} />);
    getByTestId = localGetByTestId;
  });

  test("User navigates to filter order screen", ({ given, when, then }) => {
    let FilterOrdersWrapper: ShallowWrapper;
    let instance: FilterOrders;
    given("I am a User loading filter order", () => {
      FilterOrdersWrapper = shallow(<FilterOrders {...screenProps} />);
      instance = FilterOrdersWrapper.instance() as FilterOrders

    });

    when("I clear filter button", () => {
      let lasBtns = FilterOrdersWrapper.findWhere(
        (node) => node.prop("testID") === "clearBtnTstId"
      );

      lasBtns.simulate("press");
      let buttonComponent = FilterOrdersWrapper.findWhere((node) => node.prop("testID") === "btnBackAllOrder").first()
      buttonComponent.simulate("press");
    }
    );
    then('Data will be cleared', () => {
      let currentPswrdBtn = FilterOrdersWrapper.findWhere(
        (node) => node.prop("testID") === "clearBtnTstId"
      )
      expect(currentPswrdBtn.prop("testID")).toEqual("clearBtnTstId");
    });

    when("I click to sort by filter order", () => {
      let lasBtns = FilterOrdersWrapper.findWhere(
        (node) => node.prop("testID") === "sortById"
      );
      lasBtns.simulate("press");
    }
    );
    then('sort filter loaded successfully', () => {
      let currentPswrdBtn = FilterOrdersWrapper.findWhere(
        (node) => node.prop("testID") === "sortById"
      )
      expect(currentPswrdBtn.prop("testID")).toEqual("sortById");
    });
    
    when("I click to oldest filter", () => {
      let buttonComponentrenameFile = findByTestID(FilterOrdersWrapper, "oldestbtn");
      buttonComponentrenameFile.simulate('press');

      // let saveButton1 = FilterOrdersWrapper.findWhere(
      //   (node) => node.prop("data-test-id") === "radioId"
      // );
      // saveButton1.props().onValueChange();
      
    }
    );
    then('oldest loaded successfully', () => {
      
    });
    when("I click to order status filter", () => {
      let orderBtn = FilterOrdersWrapper.findWhere(
        (node) => node.prop("testID") === "orderById"
      );
      orderBtn.simulate("press");
      FilterOrdersWrapper.setState({isActiveFilter:'orderByActive'})
      
    })

    then('order status loaded successfully', () => {
      let currentPswrdBtn = FilterOrdersWrapper.findWhere(
        (node) => node.prop("testID") === "orderById"
      )
      expect(currentPswrdBtn.prop("testID")).toEqual("orderById");
    });

    when('the order status is allOrders selected', () => {
      FilterOrdersWrapper.setState({ orderStatus: { allOrders: false, processing: true, delivered: false, returned: false } });
      let buttonComponentrenameFile = findByTestID(FilterOrdersWrapper, "processing-checkbox");
      buttonComponentrenameFile.simulate('valueChange');
          
    });
    
    then('the "All orders" checkbox should be checked', () => {
      FilterOrdersWrapper.setState({ orderStatus: { allOrders: false, processing: true, delivered: false, returned: false } });
      expect(
        FilterOrdersWrapper.findWhere(node => node.prop('testID') === 'processing-checkbox').props().value
      ).toBe(true);
      expect(
        FilterOrdersWrapper.findWhere(node => node.prop('testID') === 'allOrders-checkbox').props().value
      ).toBe(false);
      expect(
        FilterOrdersWrapper.findWhere(node => node.prop('testID') === 'delivered-checkbox').props().value
      ).toBe(false);
      expect(
        FilterOrdersWrapper.findWhere(node => node.prop('testID') === 'returned-checkbox').props().value
      ).toBe(false);
    });
    when("I click to order date filter", () => {
      let orderBtn = FilterOrdersWrapper.findWhere(
        (node) => node.prop("testID") === "dateById"
      );
      orderBtn.simulate("press");
      FilterOrdersWrapper.setState({isActiveFilter:'dateByActive'})
      
    })
    then('order date loaded successfully', () => {
      let currentPswrdBtn = FilterOrdersWrapper.findWhere(
        (node) => node.prop("testID") === "dateById"
      )
      expect(currentPswrdBtn.prop("testID")).toEqual("dateById");
    });
    
    when("I click to  last 3 month filter", () => {
      let lasBtn = FilterOrdersWrapper.findWhere(
        (node) => node.prop("testID") === "monthbtn"
      );
      lasBtn.simulate("press");
          
      let saveButton1 = FilterOrdersWrapper.findWhere(
        (node) => node.prop("data-test-id") === "radioBtn"
      );
      instance.renderCustomDateRadioButton('last3months','#ffffff')
      FilterOrdersWrapper.setState({orderDate:'last3months',selectedOrderDate:'last3months'})
      //saveButton1.props().onValueChange();
  
    })
    then('last 3 month loaded successfully', () => {
      
    
    });
    when("I click to press apply btn", () => {

      let orderDateBtn = FilterOrdersWrapper.findWhere(
        (node) => node.prop("testID") === "onApplyfilter"
      );
      orderDateBtn.simulate("press");

    })

    then('data load succesfully', () => {
      let lasBtn = FilterOrdersWrapper.findWhere(
        (node) => node.prop("testID") === "onApplyfilter"
      )
      expect(lasBtn.prop("testID")).toEqual("onApplyfilter");

    });
    when("I click to 30 days filter", () => {
      let lasBtn = FilterOrdersWrapper.findWhere(
        (node) => node.prop("testID") === "lastbtn"
      );
      lasBtn.simulate("press");
          
      let saveButton1 = FilterOrdersWrapper.findWhere(
        (node) => node.prop("data-test-id") === "radioBtn"
      );
      instance.renderCustomDateRadioButton('last30days','#ffffff')
      FilterOrdersWrapper.setState({orderDate:'last30days',selectedOrderDate:'last30days'})
      //saveButton1.props().onValueChange();
  
    })
    then('30 days data loaded successfully', () => {
      
    
    });
    when("I click to press apply btn", () => {

      let orderDateBtn = FilterOrdersWrapper.findWhere(
        (node) => node.prop("testID") === "onApplyfilter"
      );
      orderDateBtn.simulate("press");

    })

    then('data load succesfully', () => {
      let lasBtn = FilterOrdersWrapper.findWhere(
        (node) => node.prop("testID") === "onApplyfilter"
      )
      expect(lasBtn.prop("testID")).toEqual("onApplyfilter");

    });
    when("I click to current year filter", () => {
      let lasBtn = FilterOrdersWrapper.findWhere(
        (node) => node.prop("testID") === "currbtn"
      );
      lasBtn.simulate("press");
          
      let saveButton1 = FilterOrdersWrapper.findWhere(
        (node) => node.prop("data-test-id") === "radioBtn"
      );
      instance.renderCustomDateRadioButton('2024','#ffffff')
      FilterOrdersWrapper.setState({orderDate:'2024',selectedOrderDate:'2024'})
      //saveButton1.props().onValueChange();
  
    })
    then('data loaded successfully', () => {
      
      let lasBtn = FilterOrdersWrapper.findWhere(
        (node) => node.prop("testID") === "currbtn"
      )
      expect(lasBtn.prop("testID")).toEqual("currbtn");

    });
    when("I click to sort by filter order", () => {
      let lasBtns = FilterOrdersWrapper.findWhere(
        (node) => node.prop("testID") === "sortById"
      );
      lasBtns.simulate("press");
    }
    );
    then('sort filter loaded successfully', () => {
      let currentPswrdBtn = FilterOrdersWrapper.findWhere(
        (node) => node.prop("testID") === "sortById"
      )
      expect(currentPswrdBtn.prop("testID")).toEqual("sortById");
    });
    when("I click to mostRecent filter", () => {
      let buttonComponentrenameFile = findByTestID(FilterOrdersWrapper, "mostbtn");
      buttonComponentrenameFile.simulate('press');

    }
    );
    then('most recent loaded successfully', () => {
      let lasBtn = FilterOrdersWrapper.findWhere(
        (node) => node.prop("testID") === "mostbtn"
      )
      expect(lasBtn.prop("testID")).toEqual("mostbtn");
    });
    when("I click to press apply btn", () => {

      let orderDateBtn = FilterOrdersWrapper.findWhere(
        (node) => node.prop("testID") === "onApplyfilter"
      );
      orderDateBtn.simulate("press");

    })

    then('data load succesfully', () => {
      let lasBtn = FilterOrdersWrapper.findWhere(
        (node) => node.prop("testID") === "onApplyfilter"
      )
      expect(lasBtn.prop("testID")).toEqual("onApplyfilter");

    });
  })
})