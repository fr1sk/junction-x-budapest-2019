import { userRepository } from 'gateways';

export default async (req, res, next) => {
  if (req.cookies['user']) {
    return next();
  }

  const user = await userRepository.getUser();
  res.cookie('user', user._id, { maxAge: 900000, httpOnly: true });

  await userRepository.login(user._id);

  return next();
};