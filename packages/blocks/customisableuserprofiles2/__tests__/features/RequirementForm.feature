Feature: RequirementForm

  Scenario: User navigates to RequirementForm
    Given I am a User loading RequirementForm

    When I select the gender
    Then gender render on the screen

    When I enter the more details input
    Then More details will render on the screen

    When I enter the color prefrence input
    Then Color prefrence will render on the screen


    When I enter the min price input
    Then min price will render on the screen

    When I enter the max price input
    Then max price will render on the screen

    When I select Image
    Then Image will render on the screen
    
    When I click on request page
    Then I will navigate to request page

    When The profile picture rendered
    When The profile picture will display on the screen

    When I click on back Btm
    When I will navigate to Rquest list

    When I click on Edit Btn
    When The details Api call

    When I click on Update Btn
    When The update Api call

    When I click on Edit Btn
    When The details Api call

    When I click on Update Btn
    When The update Api call

    When I click on submit Btn
    When The create Api call
   
  Scenario: User navigates to Confirmation
   Given I am a User loading Confirmation page

   When I click on Confirmation page
   Then I will navigate to Confirmation page

   When I click on Request Btn
   Then I will navigate to Request page