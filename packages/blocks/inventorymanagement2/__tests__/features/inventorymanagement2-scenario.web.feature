Feature: inventorymanagement2

    Scenario: User navigates to inventorymanagement2
        Given I am a User loading inventorymanagement2
        When I navigate to the inventorymanagement2
        Then inventorymanagement2 will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can click bulk action button to open modal
        And I can click catgorie buttons
        And I can click modal close button
        And I can leave the screen with out errors