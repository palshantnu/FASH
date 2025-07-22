Feature: ordermanagementbuyerorderview

    Scenario: User navigates to ordermanagementbuyerorderview
        Given I am a User loading ordermanagementbuyerorderview
        When I navigate to the ordermanagementbuyerorderview
        Then ordermanagementbuyerorderview will load with out errors
        And I can back button with out errors
        And I can navigation payload with out errors
        And I can navigation payload delivered with out errors
        And I can show all order api work with out errors
        And I can show all order flatlist by render with out errors
        And I can cancel order api call with out errors