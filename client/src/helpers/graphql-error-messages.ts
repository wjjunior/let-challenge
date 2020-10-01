export default function graphQLErrorMessages(errorsFromCatch: any) {
  const errors = errorsFromCatch.graphQLErrors[0];
  const messages = [];

  const hasProperty = Object.prototype.hasOwnProperty.call(
    errors,
    "functionError"
  );
  if (hasProperty) {
    const customErrors = JSON.parse(errors.functionError);
    messages.push(...customErrors.errors);
  } else {
    messages.push(errors.message);
  }

  return messages;
}
