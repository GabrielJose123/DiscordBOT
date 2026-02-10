const { default: axios } = require("axios");
const HourLog = require("./HourLog");

class FetchOp {
    constructor (url) {
        this.url = url;
    };

    get() {
        return (
            axios({
                method: 'get',
                url: this.url,
                responseType: 'text'
            })
            .then(res => HourLog(`GET URL ${this.url} HAS BEEN SUCESSFUL: ${res}`) )
            .catch(err => HourLog(`GET URL ${this.url} has been failed because ${err}`) )
        )
    };

    getById() {
        
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
            .then(res => HourLog(`DELETE URL ${this.url}`))
            .catch(err => HourLog(`DELETE URL ${this.url} has been failed because ${err}`))
        )
    }

    put() {

    }
}