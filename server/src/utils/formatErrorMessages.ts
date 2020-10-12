export interface MessageInterface {
  context: string;
  message: Array<string>;
}

function formatErrorMessages(message: Array<string>, context = 'details'): [MessageInterface] {
  return [{
    context,
    message
  }];
}
export default formatErrorMessages;
