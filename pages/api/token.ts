import { NextApiHandler } from "next";
import auth0 from "../../lib/auth0";

const token: NextApiHandler = async (req, res) => {
  try {
    const tokenCache = await auth0.tokenCache(req, res);
    const { accessToken } = await tokenCache.getAccessToken();
    res.json({ token: accessToken });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
};

export default token;
