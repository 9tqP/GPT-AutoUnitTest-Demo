# UnitTest

GPT (Cursor) による、設計からの自動テストケース・UnitTest 作成の デモ です。

### 設計

下記による設計

- openapi
- mermaid - classDiagram

[ファイル](./architecture001.md)

## OpenAPI から Gherkin 形式のテストケースを作成

1. `architecture/api/openapi.yaml` を開く
2. Chat で prompt_examples_001 をメンション `@prompt_examples_001.md`。
3. プロンプト実行で、Gherkin 形式のテストケースが生成される

- 生成済みファイル : `feature/OpenAPIExamples.feature`

## API 設計(OpenAPI)、API レスポンスサンプル(Gherkin)、Class 図(Mermaid) を使用して UnitTest のテストケースを作成

1. `architecture001.md` を開く
2. Chat で prompt_test_list_js_001 をメンション `@prompt_test_list_js_001.md`。
3. プロンプト実行で、Gherkin 形式の UnitTest テストケースが生成される

- 生成済みファイル : `feature/UserService.feature`

## UnitTest テストケース(Gherkin)、JS 実装 を使用して UnitTest コードを作成

1. `test/User.js` を開く
2. Chat で prompt_test_code_js_001 をメンション `@prompt_test_code_js_001.md`。
3. プロンプト実行で、Jest 形式の UnitTest コードが生成される

## User.test.js

### test ディレクトリに移動

```sh
cd test
```

### テスト実行

```sh
npm test
```

```sh
> js@1.0.0 test
> jest

 PASS  ./User.test.js
  UserService
    正常系
      メソッド
        ✓ fetch - 正常ユーザー（複数） (2 ms)
        ✓ getUserByIndex - 正常ユーザー
        ✓ getUserById - 正常ユーザー
    異常系
      メソッド
        ✓ fetch - 無効な URL (5 ms)
        ✓ getUserByIndex - 無効なインデックス
        ✓ getUserById - 無効なid (1 ms)
        ✓ fetch - id不正ユーザー
        ✓ fetch - name不正ユーザー (1 ms)
        ✓ fetch - birthday不正ユーザー
      プロパティ
        ✓ UserService.url (1 ms)

Test Suites: 1 passed, 1 total
Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        0.251 s
Ran all test suites.
```
