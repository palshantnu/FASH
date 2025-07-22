Feature: ordermanagementbuyerorderstatus

    Scenario: User navigates to ordermanagementbuyerorderstatus
        Given I am a User loading ordermanagementbuyerorderstatus
        When I navigate to the ordermanagementbuyerorderstatus
        Then ordermanagementbuyerorderstatus will load with out errors
        When I can set order status cancelelled
        Then I can check order status cancel with out errors
        When I can set order status retrun place
        Then I can check order status retrun place order with out errors
        When I can set order status retrun cancelled
        Then I can check order status retrun cancelled order with out errors

    Scenario: User navigates to ordermanagementbuyerorderstatus for order status
        Given I am a User loading ordermanagementbuyerorderstatus for order status
        When I navigate to the ordermanagementbuyerorderstatus for order status
        Then ordermanagementbuyerorderstatus will load with out errors for order status
        When I can set order status cancelelled for order status
        Then I can check order status cancel with out errors for order status
        When I can set order status retrun place for order status
        Then I can check order status retrun place order with out errors for order status
        When I can set order status retrun cancelled for order status
        Then I can check order status retrun cancelled order with out errors for order status