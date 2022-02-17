import cookie, { serialize } from 'cookie'

export default async function handler(req, res) {
	res.setHeader('Set-Cookie', [
    serialize('__Secure-next-auth.session-token', '', {
      maxAge: -1,
      path: '/',
    }),
    serialize('__Secure-next-auth.session-token', '', {
      maxAge: -1,
      path: '/api',
    }),
    serialize('next-auth.session-token', '', {
      maxAge: -1,
      path: '/',
    }),
    serialize('next-auth.session-token', '', {
      maxAge: -1,
      path: '/api',
    }),
  ]);
	res.writeHead(302, { Location: '/' });
	return res.end();
}