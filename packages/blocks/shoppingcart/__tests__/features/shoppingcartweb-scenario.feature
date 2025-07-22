Feature: shoppingcart

    Scenario: User navigates to ShoppingCartOrders
        Given I am a User loading ShoppingCartOrders
        When I navigate to the ShoppingCartOrders
        And I can click the button
        Then ShoppingCartOrders will load with out errors
        And I can leave the screen with out errors

    Scenario: User navigates to AddShoppingCartOrderItem
        Given I am a User loading AddShoppingCartOrderItem
        When I navigate to the AddShoppingCartOrderItem
        And I can input the information
        And I can click the button
        Then AddShoppingCartOrderItem will be added with out errors
        And I can leave the screen with out errors