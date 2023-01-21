const BlockChain = require('./BlockChain')
const Block = require("./block");

describe('BlockChain()' , ()=>{
    let blockchain = new BlockChain()
    beforeEach(()=>{
        blockchain = new BlockChain()
    })

    it('contains a chain Array instance' , ()=>{
        expect(blockchain.chain instanceof Array).toBe(true)
    })
    it('starts with the genesis Block' , ()=>{
        expect(blockchain.chain[0]).toEqual(Block.genesis())
    })
    it('add a new Block to the chain' , ()=>{
        const newData = 'new-data'
        blockchain.addBlock({data : newData})
        expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData)
    })
    describe('isValidChain()', ()=>{
        describe('when the chain does not start with the genesis block' , ()=>{
            it('returns false' , ()=>{
                blockchain.chain[0] = {data : 'change-data'}
                expect(BlockChain.isValidChain(blockchain.chain)).toBe(false)
            })
        })
        describe('when the chain deos start with the genesis block and multiple blocks' , ()=>{
            beforeEach(()=>{
                blockchain.addBlock({data : 'one'})
                blockchain.addBlock({data : 'two'})
                blockchain.addBlock({data : 'three'})
            })
            describe('and a lastHash reference has changed' , ()=>{
                it('returns false' , ()=>{
                    blockchain.chain[2].lastHash = 'fake-lastHash'
                    expect(BlockChain.isValidChain(blockchain.chain)).toBe(false)
                })
            })
            describe('and the chain contains a block with an invalid field' , ()=>{
                it('returns false' , ()=>{
                    blockchain.chain[2].data = 'fake-data'
                    expect(BlockChain.isValidChain(blockchain.chain)).toBe(false)
                })
            })
            describe('and the chain does not contain any invalid blocks' , ()=>{
                it('returns true' , ()=>{
                    expect(BlockChain.isValidChain(blockchain.chain)).toBe(true)
                })
            })
        })
    })
})