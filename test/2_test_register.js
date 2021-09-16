const Insurance = artifacts.require('Insurance')

contract('Insurance', (accounts) => {
  let ins;
  let owner;
  let firstInsuree;
  let secondInsuree;

  before(async () => {
    this.insurance = await Insurance.new()
    ins = this.insurance
    owner = accounts[0]
    await ins.addPolicy("Half", 50, 1000000000000, {from: accounts[0]})
    await ins.addPolicy("Full", 100, 2000000000000, {from: accounts[0]})
    firstInsuree = accounts[1]
    secondInsuree = accounts[2]

  })

  it('adds single insuree for half coverage', async () => {

    initialBalance = await web3.eth.getBalance(accounts[1])
    let log = await ins.register("Iman", "Imani", "XXXXXXXXXX", 1, {from: accounts[1], value: 1000000000000})
    let status = log.receipt.status
    let registered = await ins.insurees(accounts[1])
    finalBalance = await web3.eth.getBalance(accounts[1])
    assert.equal(status, true)
    assert.equal(registered.firstName, 'Iman')
    assert.equal(registered.lastName, 'Imani')
    assert.equal(registered.ssid, 'XXXXXXXXXX')
    assert.equal(registered.policyID, 1)
    assert.notEqual(initialBalance, finalBalance)
  })


  it('adds single insuree for full coverage', async () => {
    initialBalance = await web3.eth.getBalance(accounts[2])
    let log = await ins.register("Damoon", "Imani", "XXXXXXXXXX", 2, {from: accounts[2], value: 2000000000000})
    let status = log.receipt.status
    let registered = await ins.insurees(accounts[2])
    finalBalance = await web3.eth.getBalance(accounts[2])
    assert.equal(status, true)
    assert.equal(registered.firstName, 'Damoon')
    assert.equal(registered.lastName, 'Imani')
    assert.equal(registered.ssid, 'XXXXXXXXXX')
    assert.equal(registered.policyID, 2)
    assert.notEqual(initialBalance, finalBalance)
  })

})
