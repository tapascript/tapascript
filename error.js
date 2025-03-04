class ErrorHandler {
  handleExitError(message) {
    console.log(message ?? "Someting went wrong");
    process.exit(1);
  }
}

export default ErrorHandler;
