Feature: ShippingPolicy

  Scenario: User navigates to ShippingPolicy
    Given I am a User loading ShippingPolicy
    When I navigate to ShippingPolicy
    Then ShippingPolicy will load
    And ShippingPolicy will load english api with out errors
    And goBackID