export const verifyUser = async (
  _username: string,
  _password: string,
  done: any
) => {
  try {
    const user = { id: 1, username: "exampleUser" };
    return done(null, user);
  } catch (error) {
    console.error("Błąd podczas weryfikacji użytkownika:", error);
    done(error);
  }
};
