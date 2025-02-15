import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

export const createToken = (
  payload: JwtPayload,
  secret: string,
  expireTime: SignOptions['expiresIn'] = '1h',
): string => {
  try {
    return jwt.sign(payload, secret, { expiresIn: expireTime });
  } catch (error) {
    console.error('Error while creating token:', error);
    throw error;
  }
};

export const decodeToken = async (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error) {
    console.log('Failed to decode token!!');
    throw error;
  }
};
