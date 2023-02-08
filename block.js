const {GENESIS_DATA, MINE_RATE} = require("./config");
const cryptoHash = require("./crypto-hash");

class Block{
    constructor({timeStamp , lastHash , hash , data , difficulty , nonce}) {
        this.timeStamp = timeStamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.difficulty = difficulty;
        this.nonce = nonce
    }
    static genesis(){
        return new this(GENESIS_DATA)
    }
    static mineBlock({lastBlock , data}){
        let timeStamp,hash;
        const lastHash = lastBlock.hash;
        let {difficulty} = lastBlock
        let nonce = 0;
        do{
            nonce++;
            timeStamp = Date.now();
            difficulty = Block.AdjustDifficulty({originalBlock : lastBlock , timeStamp})
            hash = cryptoHash(timeStamp , difficulty , nonce , lastHash , data)
        }while (hash.substring(0,difficulty) !== '0'.repeat(difficulty))
            return new this({
                timeStamp,
                lastHash,
                hash : cryptoHash(timeStamp, difficulty, nonce , lastHash , data),
                difficulty,
                nonce,
                data
            })
    }
    static AdjustDifficulty({originalBlock , timeStamp}){
        const {difficulty} = originalBlock
        if (difficulty < 1) return 1
        if((timeStamp - originalBlock.timeStamp) > MINE_RATE) return difficulty - 1
        return difficulty + 1
    }
}

module.exports = Block;