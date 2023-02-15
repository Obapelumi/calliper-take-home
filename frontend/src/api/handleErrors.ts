export const handleErrors = async (response: Response) => {
  if (!response.ok) {
    const error = await response.text();
    throw Error(error || "Unknown error");
  }
};
