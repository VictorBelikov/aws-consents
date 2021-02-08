'use strict';

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'hello, world2 prod' }),
  };
};

module.exports.testFunction1 = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'make some useful here prod' }),
  };
};

module.exports.additionalTest = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'new additionalTest funcion' }),
  };
};
