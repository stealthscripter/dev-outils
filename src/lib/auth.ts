import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { customSession, openAPI } from "better-auth/plugins";
import sendEmail from "./send-email";
import EmailVerification from "../../emails/email-verification";
import { renderVerificationEmail } from "./render-email";
const prisma = new PrismaClient();
export async function findUserRoles(userId: string): Promise<string> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (!user) {
    throw new Error(`User with ID ${userId} not found.`);
  }

  return user.role;
}
export const auth = betterAuth({
  advanced: {
    ipAddress: {
      ipAddressHeaders: ["x-client-ip", "x-forwarded-for"],
      disableIpTracking: false
    }
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  session: {
    cookieCache: {
      enabled: false,
      maxAge: 5 * 60
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 6,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }) => {
      try {
        const html = await renderVerificationEmail({
          userFirstname: user.name ?? "User",
          url,
          token,
        });
        await sendEmail({
          to: user.email,
          subject: "Verify Your Email",
          html,
          from: "Dev Outils Support <support@devoutils.com>",
        });
      } catch (error) {
        console.error("Failed to send verification email", error);
        throw new Error("Failed to send verification email");
      }
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 3600 // 1 hour
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [nextCookies(), openAPI(), customSession(async ({ user, session }) => {
    // Await the role lookup
    const role = await findUserRoles(session.userId);

    // Extend the session and user objects
    return {
      session: {
        ...session,
        user: {
          ...user,
          role, // add role to user object inside session
        },
      },
      user: {
        ...user,
        role, // add role to the user object directly
      },
    };
  }),]
});
