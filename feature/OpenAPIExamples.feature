Feature: User schema validation

  # 正常系

  Scenario: 正常系 - 正常ユーザー
    Given response : `[ { "id": 1, "name": "John Doe", "birthday": "1980-01-01" } ]`
    When Userスキーマに対してJSONレスポンスを検証する
    Then true

  Scenario: 正常系 - 正常ユーザー（複数）
    Given response : `[ { "id": 1, "name": "John Doe", "birthday": "1980-01-01" }, { "id": 2, "name": "Jane Doe", "birthday": "1985-02-02" }, { "id": 3, "name": "Jim Doe", "birthday": "1990-03-03"} ]`
    When Userスキーマに対してJSONレスポンスを検証する
    Then true

  # 異常系

  Scenario: 異常系 - id不正ユーザー
    Given response : `[ { "id": "invalid", "name": "John Doe", "birthday": "1980-01-01" } ]`
    When Userスキーマに対してJSONレスポンスを検証する
    Then false

  Scenario: 異常系 - name不正ユーザー
    Given response : `[ { "id": 1, "name": 123, "birthday": "1980-01-01" } ]`
    When Userスキーマに対してJSONレスポンスを検証する
    Then false

  Scenario: 異常系 - birthday不正ユーザー
    Given response : `[ { "id": 1, "name": "John Doe", "birthday": "invalid-date" } ]`
    When Userスキーマに対してJSONレスポンスを検証する
    Then false
