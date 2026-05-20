import {
  CognitoIdentityProviderClient,
  DeleteUserCommand,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { useState } from "react";
import { fetchUser } from "../apis/auth";

const client = new CognitoIdentityProviderClient({
  region: "us-east-2",
});

const useDeleteAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [accessToken, setAccessToken] = useState("");
  const [userId, setUserId] = useState("");

  const signIn = async () => {
    try {
      const command = new InitiateAuthCommand({
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: "1nl4i0tdr4umqgto499u2n9mfc",
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
      });

      const response = await client.send(command);

      const at = response.AuthenticationResult?.AccessToken;

      console.log("Sigin in successfully.");

      if (!at) {
        throw new Error("Неправильна електронна пошта або пароль.");
      }

      setAccessToken(at);

      const user = await fetchUser(at);

      if (user?.id) {
        setUserId(user.id);
        return true;
      }
      return false;
    } catch (err) {
      const errorName = err?.name;

      console.log(err);
      if (errorName === "NotAuthorizedException") {
        setError("Неправильна електронна пошта або пароль.");
      } else {
        // internal server error
        setError(
          "Наразі виникла проблема зі входом. Будь ласка, спробуйте ще раз.",
        );
      }

      return false;
    }
  };

  const deleteAccount = async () => {
    try {
      const command = new DeleteUserCommand({ AccessToken: accessToken });

      await client.send(command);

      const response = await fetch(
        "https://tcaci7wxhj5uc2gelipkuhg3zy0teyby.lambda-url.us-east-2.on.aws/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId }),
        },
      );

      console.log("Delete Account Successfully.");

      const { ok } = await response.json();

      return ok;
    } catch (err) {
      setError(err);
      console.log(err);
      return false;
    }
  };

  return [email, setEmail, password, setPassword, error, signIn, deleteAccount];
};

export default useDeleteAccount;
