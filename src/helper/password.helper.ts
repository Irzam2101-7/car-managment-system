import crypto from "crypto";

/**
 * Helper function to generate a random password.
 * @returns Randomly generated password
 */
export const generateRandomPassword = (): string => {
  return crypto.randomBytes(8).toString("hex"); // 16-character random string
};
