export const onPromiseHandler =
  (promise: (event: React.SyntheticEvent) => Promise<void>) => (event: React.SyntheticEvent) => {
    if (promise) {
      promise(event).catch((error: Error) => console.warn(error));
    }
  };
