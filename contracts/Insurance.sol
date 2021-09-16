// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Insurance {

    // DATA STRUCTURES //

    struct Policy {
    string name;
    uint coverage;
    uint annualPrice;
    }

    struct Center {
    string name;
    string addr;
    address wallet;
    }

    struct Person {
    string firstName;
    string lastName;
    string ssid;
    uint256 policyID;
    }

    address public owner;
    address public contractAddress;

    // lists and mappings //
    mapping(uint => Policy) public policies;
    mapping(address => Center) public centers;
    mapping(address => Person) public insurees;


    uint public centerCount = 0;
    uint public policyCount = 0;
    uint private people = 0;

    // MODIFIERS //
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    modifier notOwner {
        require(msg.sender != owner);
        _;
    }

    modifier onlyCenter {
        require(centers[msg.sender].wallet == msg.sender);
        _;
    }

    // Logic and Functions //
    constructor() public {
    owner = address(msg.sender);
    contractAddress = address(this);
    }

    function addPolicy( string memory _policyName, uint256 _percentage, uint _annualPrice) public onlyOwner {
      policyCount ++;
      Policy memory _policy = Policy( _policyName, _percentage, _annualPrice);
      policies[policyCount] = _policy;

    }

    function getOwner() public view returns(address _owner) {
      _owner = owner;
    }

    // function getPolicyByID(uint256 _id) public view returns ( Policy _policy){
    //     require(_id <= policyCount);
    //     _policy = policies[_id];
    //     return _policy;
    // }


    function addCenter(
      string memory _name,
      string memory _addr,
      address _wallet )
      public
      onlyOwner {
        centerCount ++;
        centers[_wallet] = Center(_name, _addr, _wallet);

    }

  function register(
    string memory _firstName,
    string memory _lastName,
    string memory _ssid,
    uint policyNumber )
    public
    payable
    notOwner {

        require(policyNumber <= policyCount);
        people ++;
        msg.sender.transfer(policies[policyNumber].annualPrice);
        insurees[msg.sender] = Person(_firstName, _lastName, _ssid, policyNumber);
  }



    address coverageAddress;

    function setSendMoneyAddress(address _coverageAddress) public {
        coverageAddress = _coverageAddress;
    }

    function coverAlibi(uint totalAmount, address _insuree) external payable onlyCenter {
        Coverage coverage = Coverage(coverageAddress);
        uint _amount = totalAmount*policies[insurees[_insuree].policyID].coverage/100;
        coverage.payFranchise(_amount, msg.sender);
    }
}

contract Coverage {

  address public coverageContractAddress;

  constructor() public {
    coverageContractAddress = address(this);
  }

   function payFranchise(uint amount, address payable _reciever) external payable{
       _reciever.transfer(amount);
   }

}
