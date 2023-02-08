const Block = require('./block')
const {GENESIS_DATA} = require("./config");
const cryptoHash = require("./cryptoHash");

describe('block()' , ()=>{
    const timeStamp = '123456'
    const lastHash = 'foo-lastHash'
    const hash = 'foo-hash'
    const data = ['reza' , 'tena']

    const block = new Block({
        timeStamp,
        lastHash,
        hash,
        data
    })
    it('set the data block' , ()=>{
        expect(block.timeStamp).toEqual(timeStamp)
        expect(block.lastHash).toEqual(lastHash)
        expect(block.hash).toEqual(hash)
        expect(block.data).toEqual(data)
    })
    describe('genesisblock()' , ()=>{
        const genesisblock = Block.genesis()
        it('genesis instance of array' , ()=>{
            expect(genesisblock instanceof Block).toEqual(true)
        })
        it('genesis to equal GENESIS_DATA' , ()=>{
            expect(genesisblock).toEqual(GENESIS_DATA)
        })
    })
    describe('mineblock()' , ()=>{
        const lastlBlock = Block.genesis()
        const data = 'foo-data'
        const mineblocked = Block.mineBlock({lastlBlock, data})
        it('mineblocked instanceof block' , ()=>{
            expect(mineblocked instanceof Block).toEqual(true)
        })
        it('lastHash mineblock to equal hash genesis' , ()=>{
            expect(mineblocked.lastHash).toEqual(lastlBlock.hash)
        })
        it('set the data to equal' , ()=>{
            expect(mineblocked.data).toEqual(data)
        })
        it('timeStamp not to equal undefined' , ()=>{
            expect(mineblocked.timeStamp).not.toEqual(undefined)
        })
        it('cryptoHash' , ()=>{
            expect(mineblocked.hash).toEqual(cryptoHash(mineblocked.timeStamp , lastlBlock.hash , data))
        })
    })
})