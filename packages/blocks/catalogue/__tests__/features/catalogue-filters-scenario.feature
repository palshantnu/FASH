Feature: catalogue-filters

  Scenario: user navigates to catalogue filters page
    Given I am an user loading filters page
    When I open filters page
    Then filters loads without errors
    And I can update minimum price
    And I can update maximum price
    When I click on size tab
    Then I can see available sizes
    And I can toggle sizes
    When I click on colors tab
    Then I can see colors
    And I can toggle colors
    When I click on sort by tab
    Then I can see sort by
    And I can toggle sort by
    When I click a category
    Then I can select category
    Then I can select subcategory
    And I can click on cross icon on selected sub category
    When I click on Stores tab
    Then I can see stores
    And I can toggle stores
    When I click on apply filters
    Then I go back with applied filters
    When I click clear all filters
    Then Filters are removed
