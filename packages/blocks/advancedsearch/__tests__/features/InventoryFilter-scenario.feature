Feature: InventoryFilter

    Scenario: Seller opens up InventoryFilter
        Given Seller is on InventoryFilter screen
        When The page loads completely
        Then Seller can see the page without errors
        Then I click on colors tab
        Then I can see colors
        Then I can toggle colors
        Then I click on price tab
        Then I can update minimum price
        Then I can update maximum price
        Then I click on gender tab
        Then I can select category
        Then I can select subcategory
        Then I can click on cross icon on selected sub category