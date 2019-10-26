import { userRepository } from 'gateways';

export default async (req, res, next) => {
  console.log('eeeeee');
  if (req.cookies['user']) {
    return next();
  }

  const user = await userRepository.getUser();
  res.cookie('user', user._id, { maxAge: 900000, httpOnly: true });
  return next();
};