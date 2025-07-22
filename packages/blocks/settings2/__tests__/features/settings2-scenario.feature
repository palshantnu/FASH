Feature: settings2

    Scenario: User navigates to settings2
        Given I am a User loading settings2
        When I navigate to the settings2
        Then settings2 will load with out errors
        Then I can press processing btn
        Then I can press saved cards btn
        Then I can press delivered btn
        Then I can press return btn
        Then I can press all order btn
        Then I can press my profile btn
        Then I can press fav stylist btn
        Then I can press address btn
        Then I can press payment history btn
        Then I can press contact us btn
        Then I can press faq us btn
        Then I can press goToTNC btn
        Then I can press goToPnCId btn
        Then I can press goToShippingPlcyID btn
        Then I can press goToReturnPlcyId btn
        Then I can press language currency btn
        Then I can press logout btn with out errors
        Then I can press logout confirm btn with out errors
        Then I can press cancel btn with out errors
        Then I can press delete btn with out errors
        Then I can press delete confirm btn with out errors
        Then I can press delete cancel btn with out errors
        Then I can press loyalty points btn
        And I can leave the screen with out errors