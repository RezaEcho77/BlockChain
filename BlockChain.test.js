const BlockChain = require('./BlockChain')
const Block = require("./block");

describe('BlockChain()' , ()=>{
    let blockchain, newChain , originalChain
    beforeEach(()=>{
        blockchain = new BlockChain()
        newChain = new BlockChain()
        originalChain = blockchain.chain
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
    describe('replaceChain()' , ()=>{
        describe('When the new Chain is not longer' , ()=>{
            it('does not Replace the Chain' , ()=>{
                newChain[0] = {new : 'chain'}
                blockchain.replaceChain(newChain.chain)
                expect(blockchain.chain).toEqual(originalChain)
            })
        })
        describe('When the new Chain is Longer' , ()=>{
            beforeEach(()=>{
                newChain.addBlock({data : 'one'})
                newChain.addBlock({data : 'two'})
                newChain.addBlock({data : 'three'})
            })
            describe('and the Chain is Invalid' , ()=>{
                it('does not Replace the Chain' , ()=>{
                    newChain.chain[2].hash = 'fake-hash'
                    blockchain.replaceChain(newChain.chain)
                    expect(blockchain.chain).toEqual(originalChain)
                })
            })
            describe('and the Chain is Valid' , ()=>{
                it('does Replace the Chain' , ()=>{
                    blockchain.replaceChain(newChain.chain)
                    expect(blockchain.chain).toEqual(newChain.chain)
                })
            })
        })
    })
})