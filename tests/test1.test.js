const request = require('supertest');
const checkValidation = require('../checkValidation');

describe('Test suite 1 - Name Validation:', () => {
  test('test 1 - Invalid Name: ', () => {
    expect(checkValidation.checkName('222')).toBe(false);
    expect(checkValidation.checkName('Shani222')).toBe(false);
    expect(checkValidation.checkName('')).toBe(false);
    expect(checkValidation.checkName(null)).toBe(false);
  });
  test('test 2 - Valid Name: ', () => {
    expect(checkValidation.checkName('Shani')).toBe(true);
  });
});

describe('Test suite 2 - Exam Grade Validation:', () => {
  test('test 1 - Invalid Exam Grade: ', () => {
    expect(checkValidation.checkGrade('sss')).toBe(false);
    expect(checkValidation.checkGrade('')).toBe(false);
    expect(checkValidation.checkGrade(null)).toBe(false);
    expect(checkValidation.checkGrade(101)).toBe(false);
    expect(checkValidation.checkGrade(-100)).toBe(false);
  });
  test('test 2 - Valid Exam Grade: ', () => {
    expect(checkValidation.checkGrade(95)).toBe(true);
  });
});
