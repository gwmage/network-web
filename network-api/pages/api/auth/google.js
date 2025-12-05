import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { nc } from 'next-connect';
import { connectToDatabase } from '../../../utils/db';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const db = await connectToDatabase();
        const users = db.collection('users');
        let user = await users.findOne({ googleId: profile.id });

        if (!user) {
          user = await users.findOne({ email: profile.emails[0].value });
        }

        if (user) {
          // If user exists, potentially update googleId
          if (!user.googleId) {
            await users.updateOne({ _id: user._id }, { $set: { googleId: profile.id } });
          }
          return done(null, user);
        } else {
          // Create new user
          const newUser = {
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            createdAt: new Date(),
          };
          const result = await users.insertOne(newUser);
          newUser._id = result.insertedId;
          return done(null, newUser);
        }
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

const handler = nc()
  .use(passport.initialize())
  .get(passport.authenticate('google', { scope: ['profile', 'email'] }));

export default handler;