const Insurance = artifacts.require('Insurance')
const Coverage = artifacts.require('Coverage')

contract('Insurance', (accounts) => {
  let ins;
  let cvg;
  let owner;
  let firstInsuree;
  let secondInsuree;
  let firstCenter;
  let secondCenter;

  before(async () => {

    this.insurance = await Insurance.new()
    ins = this.insurance

    this.coverage = await Coverage.deployed()
    cvg = this.coverage
    cvgAddress = await cvg.address

    await ins.setSendMoneyAddress(cvgAddress)

    owner = accounts[0]
    firstCenter = accounts[1]
    secondCenter = accounts[2]

    firstInsuree = accounts[3];
    firstInsuree = accounts[29];

    await ins.addPolicy("Half", 50, 1000000000000, {from: accounts[0]})
    await ins.addPolicy("Full", 100, 2000000000000, {from: accounts[0]})

    await ins.addCenter("Health Care Center 1", "Tehran", accounts[1], {from: accounts[0]})
    await ins.addCenter("Health Care Center 2", "Qazvin", accounts[2], {from: accounts[0]})


    for (let i = 3; i < 29; i++) {
      await ins.register(`Insuree name ${i-3}` , `Insuree name ${i-3}`, `XXXXXXXXXX${i}`, 1, {from: accounts[i], value: 1000000000000})
    }

    for (let i = 29; i < 50; i++) {
      await ins.register(`Insuree name ${i-3}` , `Insuree name ${i-3}`, `XXXXXXXXXX${i}`, 1, {from: accounts[i], value: 2000000000000})
    }

  })

  it('pays to center', async () => {
    fitstCenterInitBalance = await web3.eth.getBalance(accounts[1])
    let firstLog = await ins.coverAlibi(100000, firstInsuree, {from: accounts[1]})
    let firstReceipt = log.receipt.status
    fitstCenterFinalBalance = await web3.eth.getBalance(accounts[1])

    secondCenterInitBalance = await web3.eth.getBalance(accounts[2])
    let secondLog = await ins.coverAlibi(100000, secondInsuree, {from: accounts[2]})
    let secondReceipt = log.receipt.status
    secondCenterFinalBalance = await web3.eth.getBalance(accounts[2])

    assert.equal(firstReceipt, true)
    assert.notEqual(fitstCenterInitBalance, fitstCenterFinalBalance)

    assert.equal(secondReceipt, true)
    assert.notEqual(secondCenterInitBalance, seconditstCenterFinalBalance)


  })


})
