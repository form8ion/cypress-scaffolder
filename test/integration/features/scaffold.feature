Feature: Scaffold

  Scenario: simple
    When the project is scaffolded
    Then the cypress configuration is defined
    And a canary test is created
    And dependencies are defined
    And scripts are defined
    And eslint config is defined
    And cypress directories are ignored from version control
