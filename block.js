const {GENESIS_DATA} = require("./config");
const cryptoHash = require("./crypto-hash");

class Block{
    constructor({timeStamp , lastHash , hash , data}) {
        this.timeStamp = timeStamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }
    static genesis(){
        return new this(GENESIS_DATA)
    }
    static mineBlock({lastBlock , data}){
        let hash , timeStamp;
        const lastHash = lastBlock.hash;
            return new this({
                timeStamp,
                lastHash,
                data : data,
                hash
            })
    }
}

module.exports = Block;