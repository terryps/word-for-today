export async function fetchUser(accessToken) {
  try {
    const response = await fetch(
      "https://ugjx7a2hc66iirez44g3ageluy0gwjuf.lambda-url.us-east-2.on.aws/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Помилка отримання даних облікового запису.");
    }

    return await response.json();
  } catch (err) {
    throw new Error("Помилка отримання даних облікового запису.", {
      cause: err,
    });
  }
}
