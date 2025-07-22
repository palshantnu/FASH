Feature: productdescription

    Scenario: User navigates to productdescription
        Given I am a User loading productdescription
        When I navigate to the productdescription
        Then productdescription will load with out errors
        And I can click on share
        And I can click on wishlist
        When There are multiple photos
        Then I see dot indicators
        When There is one photo
        Then I see no dot indicators
        When I click on wishlist button
        Then product gets wishlisted
        When I click on wishlist again
        Then product gets removed from wishlist
        Then I can check for descriptionText
        
    Scenario: User changes variants
        Given I am a user on loaded product description screen
        When I change color
        Then size also gets changed

    Scenario: User toggles accordions
        Given All the accordions are open
        When I click on accordions
        Then It gets collapsed

    Scenario: User toggles accordions for stylist
        Given stylist the accordions are open
        When I click on accordions
        Then It gets collapsed

    Scenario: Seller opens product description
        Given product loaded successfully
        Then there should be no wishlist button
        Then there should be no add to cart and buy now button
        Then there should be no pair it with button

    Scenario: Guest User opens product description
        Given user can see the product
        When user clicks on wishlist
        Then user gets sign in popup
        When user clicks on buy now
        Then user gets sign in popup
        When user clicks on add to cart
        Then user goes to cart

    Scenario: Guest User opens product description for details
        Given user can see the product for details
        When user clicks on wishlist for details
        When user clicks on buy now for details
        When user clicks on add to cart for details
        Then user goes to cart for details

    Scenario: Seller opens set selectd address
        Given product loaded successfully set selectd address
        Then there should be no wishlist button set selectd address
        Then there should be no add to cart and buy now button set selectd address
        Then there should be no pair it with button set selectd address