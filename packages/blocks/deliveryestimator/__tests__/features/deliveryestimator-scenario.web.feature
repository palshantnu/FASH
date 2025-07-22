Feature: deliveryestimator

    Scenario: User navigates to deliveryestimator
        Given I am a User loading deliveryestimator
        When I navigate to the deliveryestimator
        Then deliveryestimator will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors