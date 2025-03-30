class ErrorHandler {
  handleExitError(message: string) {
    console.log(message ?? "Someting went wrong");
    process.exit(1);
  }
}

export default ErrorHandler;
