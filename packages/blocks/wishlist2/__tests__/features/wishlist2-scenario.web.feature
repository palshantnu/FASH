Feature: wishlist2

    Scenario: User navigates to wishlist2
        Given I am a User loading wishlist2
        When I navigate to the wishlist2
        Then wishlist2 will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors