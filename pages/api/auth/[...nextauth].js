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
        if (profile.email_verified && profile.email.endsWith("edu.ph")) {
          try {
            user.name = ''
            const foundUser = await User.findOne({email: profile.email})
            if (!foundUser) {
              account.voted = false
              const newUser = new User({
                email: profile.email,
                voted: false,
              })
              await newUser.save()
            } if (foundUser) {
              account.voted = foundUser.voted
            }
          } catch(err) {
            if (err) { return res.status(500) }
          }

        }
        return profile.email_verified && profile.email.endsWith("edu.ph")
      }
      return true
    },
    async jwt({token, account}) {
      if (!!account) {
        if (account.hasOwnProperty('voted')) {
          token.voted = account.voted
        }
      }
      return token
    },
  
    async session({session, token}) {
      session.voted = token.voted;
      
      return session
    }
  },
  pages: {
    signIn: '/login',
  },

  // A database is optional, but required to persist accounts in a database
  database: process.env.MONGO_URI,
})