export const getUserProfile = (req, res, next) => {
  console.log(req.params.profileName);

  res.status(200).send();
};
