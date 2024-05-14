'use strict';

const { UserService, User, UserError } = require('./User');
const fetch = require("jest-fetch-mock");

describe("UserService", () => {
  describe("正常系", () => {
    describe("メソッド", () => {
      it("fetch - 正常ユーザー（複数）", async () => {
        const userService = new UserService("http://example.com");
        fetch.mockResponseOnce(JSON.stringify([ 
          { "id": 1, "name": "John Doe", "birthday": "1980-01-01" }, 
          { "id": 2, "name": "Jane Doe", "birthday": "1985-02-02" }, 
          { "id": 3, "name": "Jim Doe", "birthday": "1990-03-03"} 
        ]));
        const result = await userService.fetch();
        expect(result).toBe(true);
      });

      it("getUserByIndex - 正常ユーザー", async () => {
        const userService = new UserService("http://example.com");
        fetch.mockResponseOnce(JSON.stringify([ 
          { "id": 1, "name": "John Doe", "birthday": "1980-01-01" }
        ]));
        await userService.fetch();
        const user = userService.getUserByIndex(0);
        expect(user).toBeInstanceOf(User);
      });

      it("getUserById - 正常ユーザー", async () => {
        const userService = new UserService("http://example.com");
        fetch.mockResponseOnce(JSON.stringify([ 
          { "id": 1, "name": "John Doe", "birthday": "1980-01-01" }
        ]));
        await userService.fetch();
        const user = userService.getUserById(1);
        expect(user).toBeInstanceOf(User);
      });
    });
  });

  describe("異常系", () => {
    describe("メソッド", () => {
      it("fetch - 無効な URL", async () => {
        const userService = new UserService("http://invalid-url");
        fetch.mockRejectOnce(new Error());
        await expect(userService.fetch()).rejects.toThrow(UserError.ERROR);
      });

      it("getUserByIndex - 無効なインデックス", async () => {
        const userService = new UserService("http://example.com");
        fetch.mockResponseOnce(JSON.stringify([ 
          { "id": 1, "name": "John Doe", "birthday": "1980-01-01" }
        ]));
        await userService.fetch();
        const user = userService.getUserByIndex(-1);
        expect(user).toBeNull();
      });

      it("getUserById - 無効なid", async () => {
        const userService = new UserService("http://example.com");
        fetch.mockResponseOnce(JSON.stringify([ 
          { "id": 1, "name": "John Doe", "birthday": "1980-01-01" }
        ]));
        await userService.fetch();
        const user = userService.getUserById(-1);
        expect(user).toBeNull();
      });

      it("fetch - id不正ユーザー", async () => {
        const userService = new UserService("http://example.com");
        fetch.mockResponseOnce(JSON.stringify([ 
          { "id": "invalid", "name": "John Doe", "birthday": "1980-01-01" }
        ]));
        await expect(userService.fetch()).rejects.toThrow(UserError.INVALID_INPUT_TYPES);
      });

      it("fetch - name不正ユーザー", async () => {
        const userService = new UserService("http://example.com");
        fetch.mockResponseOnce(JSON.stringify([ 
          { "id": 1, "name": 123, "birthday": "1980-01-01" }
        ]));
        await expect(userService.fetch()).rejects.toThrow(UserError.INVALID_INPUT_TYPES);
      });

      it("fetch - birthday不正ユーザー", async () => {
        const userService = new UserService("http://example.com");
        fetch.mockResponseOnce(JSON.stringify([ 
          { "id": 1, "name": "John Doe", "birthday": "invalid-date" }
        ]));
        await expect(userService.fetch()).rejects.toThrow(UserError.INVALID_INPUT_TYPES);
      });
    });

    describe("プロパティ", () => {
      it("UserService.url", () => {
        const userService = new UserService("http://valid-url");
        expect(() => { userService.url = "http://new-url"; }).toThrow(TypeError);
      });

      // このテストは、private フィールドのテストになるので、 Jest では実行できない
      /*
      it("UserService.users", () => {
        const userService = new UserService("http://valid-url");
        expect(() => { userService.users; }).toThrow(TypeError);
      });
      */
    });
  });
});