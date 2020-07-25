import { NextApiHandler } from "next";
import auth0 from "../../lib/auth0";

const me: NextApiHandler = async (req, res) => {
  try {
    await auth0.handleProfile(req, res);
    const session = await auth0.getSession(req);
    console.log(session);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
};

export default me;
