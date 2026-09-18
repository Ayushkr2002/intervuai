import dotenv from "dotenv";



import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/Users.js";

dotenv.config();
console.log("Google Client ID exists:", !!process.env.GOOGLE_CLIENT_ID);
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          googleId: profile.id,
        });

        if (!user) {
          user = await User.findOne({
            email: profile.emails[0].value,
          });
        }

        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            profileImage: profile.photos?.[0]?.value || "",
          });
        } else if (!user.googleId) {
          user.googleId = profile.id;

          if (!user.profileImage && profile.photos?.[0]?.value) {
            user.profileImage = profile.photos[0].value;
          }

          await user.save();
        }

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

export default passport;