const { STATUS_CODES } = require("http");
module.exports = (status, body) => {
  if (status >= 400) {
    return {
      status,
      message: STATUS_CODES[status],
      error: body,
    };
  }
  return {
    status,
    message: STATUS_CODES[status],
    data: body,
  };
};
