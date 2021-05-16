
const controller = require("../controllers/booking.controller");

module.exports = function (app) {
    // app.use(function (req, res, next) {
    //     res.header(
    //         "Access-Control-Allow-Headers",
    //         "x-access-token, Origin, Content-Type, Accept"
    //     );
    //     next();
    // });
    app.post("/api/booking", controller.booking);
    app.get("/api/booking/:userId/:campId", controller.getbooking)
};
