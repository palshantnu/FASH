Feature: LandingPageDriverOrder

    Scenario: User navigates to LandingPageDriverOrder
        Given I am a User loading LandingPageDriverOrder
        When I navigate to the LandingPageDriverOrder
        Then LandingPageDriver will load with out errors
        Then I can click on profile photo button store with out errors
        Then I click on back button
        Then I click on order back button
        Then I enter otp
        Then I Arrived at location
        Then order is in transit
        Then I click on enter customer otp
        Then I confirm otp