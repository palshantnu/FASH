Feature: RejctRefund

  Scenario: I am an seller trying to reject refund
    Given I have opened reject refund page
    When I select a reason
    Then reason gets updated
    When I click on upload photo
    Then I can select a photo
    When I click submit
    Then refund gets rejected

  Scenario: I am an seller trying to reject return
    Given I have opened reject return page
    When I select a reason
    Then reason gets updated
    When I add description
    Then Description gets updated
    When I click submit
    Then return gets rejected
