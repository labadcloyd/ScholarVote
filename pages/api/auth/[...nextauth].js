import axios from 'axios';
import NextAuth from 'next-auth'
import GoogleProvider from "next-auth/providers/google";
import { User } from '../../../backend/models'

export default NextAuth({
  session:{
    jwt: true,
    encryption: true,
    encryptionKey: process.env.JWT_ENCRYPTION_KEY,
    decryptionKey: process.env.JWT_ENCRYPTION_KEY,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async signIn(data) {
      const { account, profile, user } = data
      if (account.provider === "google") {
        /* 
          TODO add error handling in saving the user to the db
        */
        if (profile.email_verified && profile.email.endsWith("edu.ph")) {

          const foundUser = await User.findOne({email: profile.email})
          if (!foundUser) {
            const newUser = new User({
              email: profile.email,
              voted: false,
            })
            await newUser.save()
          }

        }
        return profile.email_verified && profile.email.endsWith("edu.ph")
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
    pages: {
      signIn: '/login',
    }
  },

  // A database is optional, but required to persist accounts in a database
  database: process.env.MONGO_URI,
})