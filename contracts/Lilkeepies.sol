// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lilkeepies {
    struct Child {
        uint id;
        string name;
        uint256 DOB;
        uint Height;
        uint Weight;
        uint BMI;
    }

    event ChildReg(
        uint id,
        string name,
        uint256 DOB,
        uint Height,
        uint Weight,
        uint BMI
    );

    event ChildMod(uint id, uint256 DOB, uint Height, uint Weight, uint BMI);

    mapping(address => mapping(uint => Child)) public Childs;
    mapping(address => uint) public numChilds;

    constructor() {
        createRegChild("Fer", 27012003, 163, 560, 211);
    }

    function createRegChild(
        string memory _name,
        uint256 _dob,
        uint _height,
        uint _weight,
        uint _bmi
    ) public {
        uint numChild = numChilds[msg.sender];
        Childs[msg.sender][numChild] = Child(
            numChild,
            _name,
            _dob,
            _height,
            _weight,
            _bmi
        );
        emit ChildReg(numChild, _name, _dob, _height, _weight, _bmi);
        numChilds[msg.sender]++;
    }

    function updateDataChild(
        uint _id,
        uint256 _dob,
        uint _height,
        uint _weight,
        uint _bmi
    ) public {
        Child memory child = Childs[msg.sender][_id];
        child.DOB = _dob;
        child.Height = _height;
        child.Weight = _weight;
        child.BMI = _bmi;
        Childs[msg.sender][_id] = child;
        emit ChildMod(_id, _dob, _height, _weight, _bmi);
    }
}
