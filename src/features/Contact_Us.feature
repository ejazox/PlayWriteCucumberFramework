@regression @contact-us
Feature: WebdriverUniversity.com - Contact Us Page
  
    Scenario: Valid Contact Us From Submission
        Given I navigate to WebdriverUniversity homepage
        When I click on the contact us botton
        And I switch to the new browser tab
        And I type a first name
        And I type a last name
        And I eneter an email address
        And I type a comment
        And I click on the submit button
        Then I should be presented with a successful contact us submission message
  
    Scenario: Invalid Contact Us From Submission
        Given I navigate to WebdriverUniversity homepage
        When I click on the contact us botton
        And I switch to the new browser tab
        And I type a first name
        #And I type a last name
        #And I eneter an email address
        And I type a comment
        And I click on the submit button
        Then I should be presented with a Unsuccessful contact us message
    
    Scenario: Valid Contact Us From Submission - Using Specific
        Given I navigate to WebdriverUniversity homepage
        When I click on the contact us botton
        And I switch to the new browser tab
        And I type a Specific first name "Sarah"
        And I type a last name "Woods"
        And I eneter an specifc email address "text@gmail.com"
        And I type a specific text "Hello world" and a number 2 within the comment input field
        And I click on the submit button
        Then I should be presented with a successful contact us submission message
    
    Scenario: Valid Contact Us From Submission
        Given I navigate to WebdriverUniversity homepage
        When I click on the contact us botton
        And I switch to the new browser tab
        And I type a random first name
        And I type a random last name
        And I eneter an random email address
        And I type a comment
        And I click on the submit button
        Then I should be presented with a successful contact us submission message

    @smoke  
    Scenario Outline:  : Validate Contact Us Page
        Given I navigate to WebdriverUniversity homepage
        When I click on the contact us botton
        And I switch to the new browser tab
        And I type a Specific first name "<firstName>" and a last name "<lastname>"
        And I type a email address "<emailAddress>" and a comment "<comment>"
        And I click on the submit button
        Then I should be presented with header text "<message>"

        Examples:
            | firstName | lastname | emailAddress      | comment       | message                     |
            | John      | lee      | test@gmail.com    | hello world   | Thank You for your Message! |
            | Mia       | Carter   | testlee@gmail.com | Test          | Thank You for your Message! |
            | Mark      | Warn     | Mark_gnmaik       | Test 12432234 | Invalid email address       |


