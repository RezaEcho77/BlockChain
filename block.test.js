const Block = require('./block')
const {GENESIS_DATA} = require('./config')
const cryptoHash = require("./crypto-hash");

describe("Block" , ()=>{
    const timeStamp = '123456';
    const lastHash = 'foo-hash';
    const hash = 'bar-hash';
    const data = ['Reza' , 'Zahra'];
    const block = new Block({
        timeStamp,
        lastHash,
        hash,
        data,
    })
    it('has a timeStamp , lastHash , hash and data property' , ()=>{
        expect(block.timeStamp).toEqual(timeStamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
    })
    describe('Genesis_Block' , ()=>{
        const genesisBlock = Block.genesis();
        it('Genesis Block' , ()=>{
            expect(genesisBlock instanceof  Block).toEqual(true);
        })
        it('return the Genesis Block' , ()=>{
            expect(genesisBlock).toEqual(GENESIS_DATA)
        })
    })
    describe('MineBlock()' , ()=>{
        const lastBlock = Block.genesis();
        const data = 'mined data';
        const minedBlock = Block.mineBlock({lastBlock,data});
        it('returns a block instance' , ()=>{
            expect(minedBlock instanceof Block).toEqual(true);
        })
        it('sets the `lastHash` to the `hash` of the lastBlock' , ()=>{
            expect(minedBlock.lastHash).toEqual(lastBlock.hash);
        })
        it('set the data' , ()=>{
            expect(minedBlock.data).toEqual(data);
        })
        it('set the timeStamp' , ()=>{
            expect(minedBlock.timeStamp).not.toEqual(undefined);
        })
        it('creates a SHA-256 `hash` based on the praper inputs' , ()=>{
            expect(minedBlock.hash).toEqual(cryptoHash(minedBlock.timeStamp ,lastBlock.hash , data));
        })
    })
})