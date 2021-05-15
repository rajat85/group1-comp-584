import axios from "axios";

const API_URL = "/api/booking";

class BookingService {
    bookCampSite(userId, parkCode, campGroundId, userCount, startDate, endDate) {
        return axios
            .post(API_URL, { userId, parkCode, campGroundId, userCount, startDate, endDate })
            .then((response) => {
                console.log('response from booking', response)
                return response.data;
            });
    }
}

export default new BookingService();