const BlockChain = require('./Blockchain')
const Block = require("./block");

describe('Blockchain()' , ()=>{
    let blockchain;
    beforeEach(()=>{
        blockchain = new BlockChain()
    })
    it('BlockChain instanceof array' , () => {
        expect(blockchain.chain instanceof Array).toEqual(true)
    })
    it('' , ()=>{
        expect(blockchain.chain[0]).toEqual(Block.genesis())
    })
    it('addBlock' , ()=>{
        const newData = 'data';
        blockchain.addBlock({data : newData})
        expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData)
    })
})