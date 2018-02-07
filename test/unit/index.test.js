'use strict';

const expect = require('expect.js');

describe('models/index', function () {
  it('returns the boat model', function () {
    const models = require('../../models');
    expect(models.boat).to.be.ok();
  });

  it('returns the user model', function () {
    const models = require('../../models');
    expect(models.user).to.be.ok();
  });

  it('returns the device model', function () {
    const models = require('../../models');
    expect(models.device).to.be.ok();
  });
});
