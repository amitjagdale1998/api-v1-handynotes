const jwt = require("jsonwebtoken");
const secretkey = process.env.SECRET_KEY;
const fetchuser = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        res.status(401).send({ error: "token is not valid" });
    }
    try {
        const data = jwt.verify(token, secretkey);
        req.userData = data.userData;
        next();
    } catch (error) {
        res.status(401).json({
            error: "Please authenticate using a valid token",
        });
    }
};

module.exports = fetchuser;
