Feature: customformcreatemanagetiming

    Scenario: User navigates to customformcreatemanagetiming
        Given I am a User loading customformcreatemanagetiming
        When I navigate to the customformcreatemanagetiming
        Then customformcreatemanagetiming will load with out errors
        And I should render week day monday start time empty data show
        And I should render week day monday data with out errors
        And I should render week day monday empty to time data show
        And I should render week day monday data end time with out errors
        And I should render week day tuesday start time empty data show
        And I should render week day tuesday data start time with out errors
        And I should render week day tuesday empty to time data show
        And I should render week day tuesday data end time with out errors
        And I should render week day wednesday start time empty data show
        And I should render week day wednesday data with out errors
        And I should render week day wednesday empty to time data show
        And I should render week day wednesday data end time with out errors
        And I should render week day thursday start time empty data show
        And I should render week day thursday data with out errors
        And I should render week day thursday empty to time data show
        And I should render week day thursday data end time with out errors
        And I should render week day friday start time empty data show
        And I should render week day friday data with out errors
        And I should render week day friday empty to time data show
        And I should render week day friday data end time with out errors
        And I should render week day saturday start time empty data show
        And I should render week day saturday data with out errors
        And I should render week day saturday empty to time data show
        And I should render week day saturday data end time with out errors
        And I should render week day sunday start time empty data show
        And I should render week day sunday data with out errors
        And I should render week day sunday empty to time data show
        And I should render week day sunday data end time with out errors
        And I am trying to manage timing update with empty avg time
        And I can select avg timing of user with out errors
        And I Update store timing Should Pass and update data
        And I Update store timing Should Pass and update data with errors undefined
        And I Update store timing Should Pass and update data with errors
        And I should find the testId btnBackManageTiming
        And I should get api with store timings with out errors
        And I can leave the screen with out errors