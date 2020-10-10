export interface MessageInterface {
  context: string;
  message: Array<string>;
  [Symbol.iterator]: () => Generator;
}

function formatErrorMessages(message: Array<string>, context = 'details'): MessageInterface {
  return {
    context,
    message,
    * [Symbol.iterator]() {
      const properties = Object.keys(this);
      // eslint-disable-next-line no-restricted-syntax
      for (const i of properties) {
        yield [i, this[i]];
      }
    }
  };
}
export default formatErrorMessages;
