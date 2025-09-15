/**
 * @file Provides singleton authentication middleware via Passport.js
 * */

import { getEnvConfig } from "@codecompplat/config-env";
import { prisma } from "@codecompplat/database";
import { Passport } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { compare, hash } from "bcrypt"

const passport = new Passport();

// Authentication via username + password
passport.use(new LocalStrategy(
  {
    usernameField: "username",
    passwordField: "password",
  },
  async (username: string, password: string, done) => {
    try {
      // Fetch user entry from database
      const MATCHING_USERS = await prisma.competitor.findUniqueOrThrow({
        where: {
          username: username
        }
      });

      // Check password
      const credentialsValid = await compare(password, MATCHING_USERS.password);
      if (!credentialsValid) {
        return done(null, false);
      }
      
      // Authentication passed
      return done(null, MATCHING_USERS);
    }
    catch (err: any) {
      // User does not exist
      if (err.code === "P2025") {
        return done(null, false);
      }
      return done(err);
    }
  }
));

// Aurthorization + session management via JWT
passport.use(new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: getEnvConfig({ envVariableName: "JWT_SECRET" })
  },
  async (payload, done) => {
  }
));

export { passport };
