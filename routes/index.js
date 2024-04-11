const express = require("express");
const router = express.Router();
const userRoute = require("./userRoutes");
const courseRoute = require("./courseRoute");
const enrollRoute = require("./enrollRoute");
const docsRoute = require('./docs.route');

const Routes = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/course",
    route: courseRoute,
  },
  {
    path: "/enrollment",
    route: enrollRoute,
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
