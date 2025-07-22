Feature: pair it with

    Scenario: User navigates to Pair It With screen
        Given I am an user on pair it with screen
        Then I can see the screen without errors
        And I can click on wishlist
        When I click on a similar product
        Then I go to the product screen