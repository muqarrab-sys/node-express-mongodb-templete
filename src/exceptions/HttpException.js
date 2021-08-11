class HttpException extends Error {
  code;
  status;
  data;
  message;

  constructor(code, message, status, data) {
    super(message);
    this.code = code;
    this.status = status;
    this.data = data;
    this.message = message;
  }
}

module.exports = HttpException;
