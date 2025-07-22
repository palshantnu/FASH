Feature: LowerMeasurements

  Scenario: User basic details for measurements
    Given I am a User loading LowerMesurements
    When I navigate to the LowerMesurements
    Then LowerMesurements will load without errors
    And I can handle next page navigation
    And Handle text input data