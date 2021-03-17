export const warning = (condition: boolean, description: string) => {
  if (condition) {
    console.error(description);
  }
};
