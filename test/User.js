const fetch = require("jest-fetch-mock");

// ----------------------------------------

'use strict';

// Enum for UserError
const UserError = Object.freeze({
  ERROR: "ERROR",
  INVALID_INPUT_TYPES: "INVALID_INPUT_TYPES"
});

// DataClass for User
class User {
  constructor(id, name, birthday) {
    this.id = id;
    this.name = name;
    this.birthday = new Date(birthday);
  }

  getAge() {
    const today = new Date();
    let age = today.getFullYear() - this.birthday.getFullYear();
    const m = today.getMonth() - this.birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < this.birthday.getDate())) {
      age--;
    }
    return age;
  }
}

// ServiceClass for UserService
class UserService {
  #users;

  constructor(url) {
    if (typeof url !== "string") {
      throw new Error(UserError.INVALID_INPUT_TYPES);
    }

    Object.defineProperty(this, 'url', { value: url, writable: false });
    this.#users = [];
  }

  async fetch() {
    let jsonData;
    try {
      const response = await fetch(this.url);
      jsonData = await response.json();
    } catch (error) {
      throw new Error(UserError.ERROR);
    }

    if (!Array.isArray(jsonData)) {
      throw new Error(UserError.ERROR);
    }

    this.#users = jsonData.map(user => this.#createUser(user.id, user.name, user.birthday));
    return true;
  }

  #createUser(id, name, birthday) {
    if (typeof id !== 'number' || typeof name !== 'string' || typeof birthday !== 'string') {
      throw new Error(UserError.INVALID_INPUT_TYPES);
    }

    const birthdayDate = new Date(birthday);
    if (isNaN(birthdayDate.getTime())) {
      throw new Error(UserError.INVALID_INPUT_TYPES);
    }
    return new User(id, name, birthdayDate);
  }

  getUserByIndex(index) {
    if (typeof index !== 'number' || index < 0 || index >= this.#users.length) {
      return null;
    }
    return this.#users[index];
  }

  getUserById(userId) {
    return this.#users.find(user => user.id === userId) || null;
  }
}


// ----------------------------------------

module.exports = { UserService, User, UserError };
