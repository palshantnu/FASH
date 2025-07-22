Feature: ThreeDeeView

  Scenario: User basic details ThreeDeeView
    Given I am a User loading ThreeDeeView
    When I navigate to the ThreeDeeView
    Then ThreeDeeView will load without errors
    And I can handle next page navigation