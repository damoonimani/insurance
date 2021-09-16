const Insurance = artifacts.require('Insurance')

contract('Insurance', (accounts) => {
  let ins;
  before(async () => {
    this.insurance = await Insurance.new()
    ins = this.insurance
  })

  it('adds centers', async () => {
    owner = accounts[0]
    await ins.addCenter("Health Care Center 1", "Tehran", accounts[3], {from: accounts[0]})
    await ins.addCenter("Health Care Center 2", "Qazvin", accounts[4], {from: accounts[0]})
    let centerCount = await ins.centerCount()
    let firstCenter = await ins.centers(accounts[3])
    let secondCenter = await ins.centers(accounts[4])
    assert.equal(centerCount, 2)
    assert.equal(firstCenter.name, "Health Care Center 1")
    assert.equal(firstCenter.addr, "Tehran")
    assert.equal(firstCenter.wallet, accounts[3])
    assert.equal(secondCenter.name, "Health Care Center 2")
    assert.equal(secondCenter.addr, "Qazvin")
    assert.equal(secondCenter.wallet, accounts[4])
  })


  it('shows centers', async () => {
    let centerCount = await ins.centerCount()
    let firstCenter = await ins.centers(accounts[3])
    let secondCenter = await ins.centers(accounts[4])
    assert.equal(centerCount, 2)
    assert.equal(firstCenter.name, "Health Care Center 1")
    assert.equal(firstCenter.addr, "Tehran")
    assert.equal(firstCenter.wallet, accounts[3])
    assert.equal(secondCenter.name, "Health Care Center 2")
    assert.equal(secondCenter.addr, "Qazvin")
    assert.equal(secondCenter.wallet, accounts[4])
    })

})
