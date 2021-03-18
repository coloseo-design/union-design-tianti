/* eslint import/prefer-default-export: 0 */
export const warning = (condition: boolean, description: string) => {
  if (condition) {
    /* eslint no-console: 0 */
    console.error(description);
  }
};
