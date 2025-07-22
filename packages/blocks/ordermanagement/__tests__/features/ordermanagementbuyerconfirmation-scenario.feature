Feature: OrderManagementBuyerConfirmation

    Scenario: User navigates to OrderManagementBuyerConfirmation
        Given I am a User loading OrderManagementBuyerConfirmation
        When I navigate to the OrderManagementBuyerConfirmation
        Then OrderManagementBuyerConfirmation will load with out errors
        Then Navigation to Chat with order management ID
        And I can click back button with with out errors