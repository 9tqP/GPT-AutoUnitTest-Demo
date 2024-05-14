次のタスクを実行してください

## タスク

こちらの OpenAPI 定義をもとに、gherkin で正常系と異常系のテストケースを網羅的に作成してください

## 例

### Input

```yaml
components:
  schemas:
    A:
      type: object
      properties:
        id:
          type: integer
        a002:
          type: string
        a003:
          type: string
          format: date
```

### Output

```gherkin
Feature: A schema validation

  # 正常系

  Scenario: 正常系 - 正常ユーザー
    Given responce : `[ { "id": 1, "a002": "Sample string", "a003": "2021-07-16" } ]`
    When Aスキーマに対してJSONレスポンスを検証する
    Then true

  Scenario: 正常系 - 正常ユーザー（複数）
    Given responce : `[ { "id": 1, "a002": "りんご", "a003": "2021-07-16" }, { "id": 2, "a002": "ばなな", "a003": "2022-08-20" }, { "id": 3, "a002": "さぶろう", "a003": "2023-01-01"} ]`
    When Aスキーマに対してJSONレスポンスを検証する
    Then true

  ~


  # 異常系

  Scenario: 異常系 - id不正ユーザー
    Given responce : `[ { "id": 1, "a002": "Sample string", "a003": "2021-07-16" } ]`
    When Aスキーマに対してJSONレスポンスを検証する
    Then false

  ~

```
