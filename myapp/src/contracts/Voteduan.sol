// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Voteduan {
    struct Candidate {
        uint256 id;
        string noidungduan;
        string descriptionsProject;
        uint256 voteCountYes;
        uint256 voteCountNo;
        uint256 TimeEnd;
    }

    Candidate[] public candidates;

    address owner;
    mapping(address => mapping (uint256 => bool)) public voters;

    uint256 public votingStart;
    uint256 public votingEnd;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function addCandidate(
        uint256 id_,
        string memory _name,
        string memory _descriptions,
        uint256 duriantimes
    ) public {
        Candidate memory can = Candidate({
            id: id_,
            noidungduan: _name,
            descriptionsProject: _descriptions,
            voteCountYes: 0,
            voteCountNo: 0,
            TimeEnd: block.timestamp + (duriantimes * 1 minutes)
        });
        candidates.push(can);
    }

    function vote(uint256 id_, uint256 choosevote) public {
        require(!voters[msg.sender][id_], "You have already voted.");
        require(id_<candidates.length, "invalid id");
        require(getVotingStatus(id_), "End of voted");
        for (uint256 i = 0; i < candidates.length; i++) {
            Candidate memory temp = candidates[i];
            if (temp.id == id_) {
                // choosevote == 1 => yes
                // choosevote == 2 => no
                if (choosevote == 1) {
                    candidates[i].voteCountYes++;
                }
                if (choosevote == 2) {
                    candidates[i].voteCountNo++;
                }
            }
        }
        voters[msg.sender][id_] = true;
    }

    function getAllVotesOfCandiates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function getVotingStatus(uint256 id_) public view returns (bool) {
        require(id_ < candidates.length, "invalid id");
        Candidate memory temp = candidates[id_];

        return (temp.TimeEnd > block.timestamp);
    }

    function getRemainingTime(uint256 _id) public view returns (uint256) {
        require(_id < candidates.length, "invalid id");
        Candidate memory temp = candidates[_id];
        if (!getVotingStatus(_id)) {
            return 0;
        }
        return temp.TimeEnd - block.timestamp;
    }

    function getCandidateApprove(uint256 id) public view returns (bool) {
        require(id < candidates.length, "invalid id");
        Candidate memory temp = candidates[id];
        require(block.timestamp >= temp.TimeEnd, "Voting isn't ended");
        uint256 votecountYes = temp.voteCountYes;
        uint256 votecountNo = temp.voteCountNo;
        if(votecountYes >= votecountNo) {
            return true;
        }
        return false;
    }
}
