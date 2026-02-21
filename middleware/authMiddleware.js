
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    let authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "No token provided"
        });
    }

    // remove extra spaces
    const parts = authHeader.trim().split(/\s+/);

    if (parts[0] !== "Bearer" || !parts[1]) {
        return res.status(401).json({
            success: false,
            message: "Invalid token format"
        });
    }

    const token = parts[1];
console.log(token)
    try {
        console.log("JWT_SECRET:", process.env.JWT_SECRET);

        console.log("line58")
        const decoded = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCROQWZDN1AxZ2R1R2N6ODhPVFliY3dlTXg1Y25GTWE0Z0lSSzBoSTFTM3duVXN4b1ZFLmRkYSIsImlhdCI6MTc2OTg3MTMwMCwiZXhwIjoxNzY5OTU3NzAwfQ.hRM6SrMrYXEk0S7-09lKMX3tdAVXY_IXPtzBOae4Xe8", process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

module.exports = verifyToken;
