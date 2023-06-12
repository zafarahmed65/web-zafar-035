//
// module.exports = function (req, res, next) {
//   let roles = req.session.user.role;
//   console.log(roles);
//   let admin = roles.find((r) => r == "admin");
//   if (admin) next();
//   else {
//     req.setFlash("danger", "You need to be an admin to access this resource");
//     res.redirect("back");
//   }
// };
function admin (req, res, next) {
  if (req.user.role != 'admin')
    return res.status (403).send ('Your are not authorized');
  next ();
}
module.exports = admin;

