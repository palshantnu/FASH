Feature: PaymentRequest

  Scenario: User navigates to PaymentRequest
    Given I am a User loading PaymentRequest
    When I navigate to the PaymentRequest
    Then Text input for reason of payment
    Then Text input for amount of payment
    Then Api call for payment request
