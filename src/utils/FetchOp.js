const axios  = require("axios");
const HourLog = require("./HourLog");

class FetchOp {
    constructor ({url}) {
        this.url = url;
    };

    get() {
        return (
            axios({
                method: 'get',
                url: this.url,

            })
            .then(res =>  {HourLog(`GET URL ${this.url} HAS BEEN successful: ${res.status}`)
                return res.data;
            })
            .catch(err => HourLog(`GET URL ${this.url} has been failed because ${err.message}}`))
        )
    };

    getById() {
        return (
            axios({
                method: 'get',
                url: this.url,
                responseType: 'text' 
            })
            .then(res => HourLog(`GET URL ${this.url} HAS BEEN successful: ${res.status} | ${res.data}`))
            .catch(err => HourLog(`GET URL ${this.url} has been failed because ${err.message} | ${err.response?.status || "NO_STATUS"} | ${err.response?.data || "NO_RESPONSE_DATA"}`))
        )
    }

    post(dataPost) {
        return (
            axios({
                method: 'post',
                url: this.url,
                data: dataPost
            })
        )
    }

    delete() {
        return (
            axios({
                method: 'delete',
                url: this.url,
                responseType: 'text'
            })
            .then(res => HourLog(`DELETE URL ${this.url} HAS BEEN successful: ${res.status}`))
            .catch(err => HourLog(`DELETE URL ${this.url} has been failed because ${err.message} | ${err.response?.status || "NO_STATUS"} | ${err.response?.data || "NO_RESPONSE_DATA"}`))
        )
    }

    put() {

    };
};

module.exports = FetchOp
