Feature: cfvirtualmannequin3

  Scenario: User selects an avatar
    Given I am a User loading cfvirtualmannequin3
    When I navigate to the cfvirtualmannequin3
    Then cfvirtualmannequin3 will load without errors
    And I can select the male avatar
    And I can select the female avatar

 Scenario: User selects an avatar video
    Given I am a User loading cfvirtualmannequin3 avatar video
    When I navigate to the cfvirtualmannequin3 avatar video
    Then cfvirtualmannequin3 will load without errors avatar video
    And I can select the female avatar video