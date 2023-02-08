const cryptoHash = require('./cryptoHash')

describe('cryptoHash' , ()=>{
    it('create the hash' , ()=>{
        expect(cryptoHash('foo-hash')).toEqual('bf023ebc8dd33284378219191b67766fbb61d962e860eada69e596bd698433af')
    })
    it('' , ()=>{
        expect(cryptoHash('one' , 'two' , 'three')).toEqual(cryptoHash('three' , 'two' , 'one'))
    })
})