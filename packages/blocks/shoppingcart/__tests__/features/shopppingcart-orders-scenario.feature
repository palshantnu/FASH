Feature: ShoppingCartOrders

    Scenario: User navigates to ShoppingCartOrders
        Given I am a User loading ShoppingCartOrders
        When I navigate to the ShoppingCartOrders
        Then ShoppingCartOrders will load with out errors
        And I can see my cart items
        When I click the plus button
        Then Cart item quantity gets increased
        When I click on minus button
        Then Cart item quantity gets decreased
        When I click on Checkout button
        Then I can leave the screen with out errors

    Scenario: Cart item removes
        Given Cart item quantity is one
        When I click on minus button
        Then Cart item gets removed

    Scenario: Cart item remains same
        Given Cart item quantity is set to maximum stock
        When I click on plus button
        Then I get warning

    Scenario: Guest user creates cart
        Given Guest can see his cart
        When Guest clicks plus
        Then quantity increases
        When Guest clicks minus
        Then quantity decreases
        When Guest clicks checkout button
        Then guest should get sign in warning

    Scenario: Cart item update addres
        Given Cart item to set update address
        When I click on minus button update address
        Then Cart item gets removed update address