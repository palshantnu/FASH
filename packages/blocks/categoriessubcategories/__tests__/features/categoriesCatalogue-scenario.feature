Feature: CategoriesCatalogue

    Scenario: User navigates to CategoriesCatalogue
        Given I am a User loading CategoriesCatalogue
        When I navigate to the CategoriesCatalogue
        Then CategoriesCatalogue will load with out errors
        And I can leave the screen with out errors
    Then either it is loaded from stylist or buyer
        
