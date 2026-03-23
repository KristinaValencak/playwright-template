@smoke @contact
Feature: Contact form submission

  Scenario: Submit contact form via header "Contact us" button
    Given I open the website
    When I click the "Contact us" button in the header
    When I fill the contact form with name "Test QA" email "test.qa@example.com" message "This is a QA test message."
    And I submit the contact form
    Then I should see the success message "Thank you! Your message has been sent successfully. We will contact you soon."