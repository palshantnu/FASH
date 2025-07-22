Feature: StylistVerification

  Scenario: I am a stylist trying to upload my documents
    Given I am on documents uplaod screen
    Then ui rendered successfully
    When I click on Upload button
    Then I get warning
    When I select a document
    Then I can remove the selected document
    When I select all required documents
    And click on upload
    Then It uploads the docs
    And redirects to confirmation page
