const db = require("../../models/index");
const moment = require('moment')
const Booking = db.Booking

exports.booking = (req, res) => {
    console.log(req.body)
    Booking.create({
        user_id: req.body.user_id,
        park_code: req.body.park_code,
        camp_ground_id: req.body.camp_ground_id,
        users_count: req.body.users_count,
        start_date: moment(req.body.start_date).format(),
        end_date: moment(req.body.end_date).format()
    })
        .then(response => {
            res.status(200).send(response);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}
exports.getbooking = (req, res) => {
    console.log(req.params);
    Booking.findAll({
        where: {
            user_id: req.params.userId,
            camp_ground_id: req.params.campId
        }
    }).then(booking => {
        resdates = []
        if (booking) {

            booking.map(book => {
                resdates.push({
                    start: moment(book.start_date, "MM.DD.YYYY"),
                    end: moment(book.end_date, "MM.DD.YYYY")
                })

            })
            return res.status(200).send({ 'resdates': resdates });
        }
        else {
            res.status(200).send({
                'resdates': resdates
            });
        }
    })

}