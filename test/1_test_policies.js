const Insurance = artifacts.require('Insurance')

contract('Insurance', (accounts) => {
  let ins;
  before(async () => {
    this.insurance = await Insurance.new()
    ins = this.insurance
  })

  it('creates policies', async () => {
    owner = accounts[0]
    await ins.addPolicy("Half", 50, 1000000000000, {from: accounts[0]})
    await ins.addPolicy("Full", 100, 2000000000000, {from: accounts[0]})
    let policyCount = await ins.policyCount()
    let halfPolicy = await ins.policies(1)
    let fullPolicy = await ins.policies(2)
    assert.equal(policyCount, 2)
    assert.equal(halfPolicy.name, 'Half')
    assert.equal(halfPolicy.coverage.toNumber(), 50)
    assert.equal(halfPolicy.annualPrice.toNumber(), 1000000000000)
    assert.equal(fullPolicy.name, 'Full')
    assert.equal(fullPolicy.coverage.toNumber(), 100)
    assert.equal(fullPolicy.annualPrice.toNumber(), 2000000000000)
  })


  it('shows policies', async () => {
    let policyCount = await ins.policyCount()
    let halfPolicy = await ins.policies(1)
    let fullPolicy = await ins.policies(2)
    assert.equal(policyCount, 2)
    assert.equal(halfPolicy.name, 'Half')
    assert.equal(halfPolicy.coverage.toNumber(), 50)
    assert.equal(halfPolicy.annualPrice.toNumber(), 1000000000000)
    assert.equal(fullPolicy.name, 'Full')
    assert.equal(fullPolicy.coverage.toNumber(), 100)
    assert.equal(fullPolicy.annualPrice.toNumber(), 2000000000000)
    })

})
