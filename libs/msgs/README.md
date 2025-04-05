# msgs

## Install

```bash
pnpm add @bmod/msgs
```

**I. Input Validation Messages:**

- **Error:** "The input you provided is not valid. Please double-check your data."
- **Error:** "The '{fieldName}' field is required. Please fill it in."
- **Error:** "The '{fieldName}' field must be in the format '{expectedFormat}'. For example..."
- **Error:** "The '{fieldName}' field must be between {minValue} and {maxValue}."
- **Error:** "The email address you entered is not valid."
- **Error:** "The website address you entered is not valid."
- **Error:** "The date you entered is not valid."
- **Error:** "The '{fieldName}' field must be between {minLength} and {maxLength} characters long."
- **Error:** "The '{fieldName}' you entered already exists. Please choose a unique value."

**II. Network/API Messages:**

- **Error:** "We are unable to connect to the network. Please check your internet connection."
- **Error:** "The request to the server failed. Please try again later. (Status: {statusCode}, Message: {errorMessage})"
- **Error:** "The connection to the server timed out. Please try again."
- **Error:** "You are not authorized to access this resource."
- **Error:** "You do not have permission to perform this action."
- **Error:** "The resource you requested was not found."
- **Error:** "An unexpected error occurred on the server. Please try again later."
- **Error:** "The server returned a bad gateway error. Please try again later."
- **Error:** "The service is temporarily unavailable. Please try again later."

**III. Database Messages:**

- **Error:** "We were unable to connect to the database."
- **Error:** "The database query failed. (Error: {errorMessage})"
- **Error:** "The requested record was not found in the database."
- **Error:** "A record with the same identifier already exists in the database."
- **Error:** "A database constraint was violated. Please check your data."
- **Error:** "The database transaction failed. (Error: {errorMessage})"
- **Error:** "The database operation timed out."

**IV. File System Messages:**

- **Error:** "The file '{filePath}' was not found."
- **Error:** "We were unable to read the file '{filePath}'."
- **Error:** "We were unable to save the file '{filePath}'."
- **Error:** "The directory '{directoryPath}' was not found."
- **Error:** "We were unable to create the directory '{directoryPath}'."
- **Error:** "You do not have permission to access the file '{filePath}'."
- **Error:** "The file '{filePath}' appears to be corrupted."

**V. Application Logic Messages:**

- **Error:** "The application is in an unexpected state."
- **Error:** "The operation failed. Please try again."
- **Error:** "The application configuration is invalid."
- **Error:** "A required dependency '{dependencyName}' is missing."
- **Error:** "This feature is not yet implemented."
- **Error:** "The requested resource is currently locked."
- **Error:** "A concurrency error occurred. Please try again."

**VI. User Interface Messages:**

- **Error:** "The user interface failed to render."
- **Error:** "An error occurred in the '{componentName}' component: {errorMessage}."
- **Error:** "The user interface interaction failed."
- **Error:** "An error occurred while displaying data."
- **Error:** "Navigation failed."

**VII. Security Messages:**

- **Error:** "Authentication failed. Please check your credentials."
- **Error:** "You are not authorized to perform this action."
- **Error:** "The security token is invalid."
- **Error:** "A potential security risk was detected."
- **Error:** "A potential security injection was detected."
- **Error:** "The encryption process failed."
- **Error:** "The decryption process failed."

**VIII. Configuration Messages:**

- **Error:** "The configuration file was not found."
- **Error:** "The configuration file could not be parsed."
- **Error:** "The configuration value for '{settingName}' is invalid."
- **Error:** "The required configuration setting '{settingName}' is missing."

**Success Messages:**

- **Success:** "The operation was successful."
- **Success:** "Your data was saved successfully."
- **Success:** "The data was retrieved successfully."
- **Success:** "The file was uploaded successfully."
- **Success:** "The record was created successfully."
- **Success:** "The record was updated successfully."
- **Success:** "You are now logged in."
- **Success:** "The changes were applied successfully."
- **Success:** "The process completed successfully."
- **Success:** "The message was sent successfully."
