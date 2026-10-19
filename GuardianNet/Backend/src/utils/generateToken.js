import jwt from 'jsonwebtoken';

// Generates a signed JWT containing the user's id and role.
// The token is sent to the frontend and stored in localStorage.
// Every subsequent request attaches it as: Authorization: Bearer <token>
const generateToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

export default generateToken;