function logRequests(request, response, next) {
  const { method, url } = request;
  const logMessage = `[${method.toUpperCase()}] ${url}`;
  console.time(logMessage);
  next();
  console.timeEnd(logMessage);
}

module.exports = logRequests;
