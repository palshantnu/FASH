Feature: ordermanagementbuyerallorder

    Scenario: User navigates to ordermanagementbuyerallorder
        Given I am a User loading ordermanagementbuyerallorder
        When I navigate to the ordermanagementbuyerallorder
        Then ordermanagementbuyerallorder will load with out errors
        And I can back button with out errors
        And I can navigation payload with out errors
        And I can show all order api work with out errors
        And I can show all order flatlist by render with out errors
        And I can enter text order for search with out errors
        And I can show all order api work with errors