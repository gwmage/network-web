import passport from 'passport';
import { Strategy as KakaoStrategy } from 'passport-kakao';
import { nc } from 'next-connect';
import { connectToDatabase } from '../../../utils/db';

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: '', // Kakao doesn't use clientSecret
      callbackURL: process.env.KAKAO_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const db = await connectToDatabase();
        const users = db.collection('users');
        const email = profile._json.kakao_account.email;

        let user = await users.findOne({ kakaoId: profile.id });

        if (!user && email) {
            user = await users.findOne({ email });
        }

        if (user) {
          if (!user.kakaoId) {
            await users.updateOne({ _id: user._id }, { $set: { kakaoId: profile.id } });
          }
          return done(null, user);
        } else {
          const newUser = {
            kakaoId: profile.id,
            name: profile.displayName,
            email: email, // May be null if user doesn't grant permission
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
  .get(passport.authenticate('kakao'));

export default handler;