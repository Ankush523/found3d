//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.14;

import {ISuperfluid, ISuperToken, ISuperApp} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import {SuperTokenV1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";

error Unauthorized();

contract Fund {
    address public owner;
    uint256 public currentAmount;
    using SuperTokenV1Library for ISuperToken;

    ISuperToken public fundtoken;

    // fDAIx:0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00
    // fDAI :0x88271d333C72e51516B67f5567c728E702b3eeE8

    uint256 proj_id;

    struct Project {
        uint256 proj_id;
        string proj_name;
        string proj_desc;
        address developer;
        uint256 goalAmount;
        uint256 currentAmount;
    }

    mapping(uint256 => Project) public project;
    mapping(address => bool) public accountList;

    constructor(ISuperToken _fundtoken, address _owner) {
        owner = _owner;
        fundtoken = _fundtoken;
    }

    function allowAccount(address _account) external {
        if (msg.sender != owner) revert Unauthorized();
        accountList[_account] = true;
    }

    function createFlowFromContract(address receiver, int96 flowRate) public {
        if (!accountList[msg.sender] && msg.sender != owner)
            revert Unauthorized();
        fundtoken.createFlow(receiver, flowRate);
    }

    function updateFlowFromContract(address receiver, int96 flowRate) internal {
        if (!accountList[msg.sender] && msg.sender != owner)
            revert Unauthorized();
        fundtoken.updateFlow(receiver, flowRate);
    }

    function deleteFlowFromContract(address receiver) external {
        if (!accountList[msg.sender] && msg.sender != owner)
            revert Unauthorized();

        fundtoken.deleteFlow(address(this), receiver);
    }

    // function balance(address _owner) public view returns (uint256) {
    //     return fundtoken.balanceOf(0x93B0fDbfAB9985A33278ffcbBFA1cd076fE295Bb);
    // }

    function add(uint256 _proj_id) public view returns (address) {
        return project[_proj_id].developer;
    }

    function projectregister(
        string memory _projname,
        string memory _projdesc,
        uint256 _goalAmount
    ) external {
        ++proj_id;
        project[proj_id] = Project(
            proj_id,
            _projname,
            _projdesc,
            msg.sender,
            _goalAmount,
            0
        );
    }

    function projectlist(uint256 _proj_id)
        public
        view
        returns (Project memory)
    {
        return project[_proj_id];
    }

    function funding(uint256 _proj_id) external {
        // require (project[_proj_id].currentAmount <= project[_proj_id].goalAmount, "Maximum amount reached");
        // currentAmount = token.balanceOf( project[_proj_id].developer ) ;
        // int256 rate = int256((project[_proj_id].goalAmount)/31536000);
        int96 flowrate = 1000;
        createFlowFromContract(project[_proj_id].developer, flowrate);
    }
}
