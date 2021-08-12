class HttpException extends Error {
  code;
  status;
  data;
  message;

  constructor(code, message, status, data) {
    super(message);
    this.code = code;
    this.message = message;
    this.status = status;
    this.data = data;
  }
}

module.exports = HttpException;
