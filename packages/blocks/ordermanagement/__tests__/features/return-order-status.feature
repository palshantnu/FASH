Feature: ReturnOrderStatus
  Scenario: I am a seller checking status of return item
    Given I have opned the page
    When data is loaded
    Then I can see the status
    When Order is out for pickup
    Then I can go to track order page

  Scenario: User as a seller checking status of return item
    Given I have opned the page
    When Order is out for pickup
    Then I can go to track order page