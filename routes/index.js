const express = require("express");
const router = express.Router();
const userRoute = require("./userRoutes");
const docsRoute = require('./docs.route');

const Routes = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: '/docs',
    route: docsRoute,
  },
];

Routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
