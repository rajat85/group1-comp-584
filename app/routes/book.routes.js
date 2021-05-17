
const controller = require("../controllers/booking.controller");

module.exports = function (app) {
    app.post("/api/booking", controller.booking);
};
