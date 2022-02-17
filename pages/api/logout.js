import cookie, { serialize } from 'cookie'

export default async function handler(req, res) {
	res.setHeader('Set-Cookie', [
    serialize('next-auth.session-token', '', {
      maxAge: -1,
      path: '/',
    }),
  ]);
	res.writeHead(302, { Location: '/' });
	return res.end();
}