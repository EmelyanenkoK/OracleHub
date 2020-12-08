pragma solidity >= 0.6.0;
import "./IOracleHub.sol";

contract Consumer {
    // Modifier that allows function to accept external call only if it was signed
    // with contract owner's public key.
    modifier checkOwnerAndAccept {
        require(msg.pubkey() == tvm.pubkey(), 100);
        tvm.accept();
        _;
    }

    uint value;
    address oracleHub;

    /*
     * Public functions
     */

    function requestOracle(address _oracleHub, uint32 query_id, uint32 oracle_id) public checkOwnerAndAccept {
      oracleHub = _oracleHub;
      IOracleHub(oracleHub).requestData{value: 1 ton}(tvm.functionId(Consumer.onAccept),query_id,oracle_id);
    }

    function getValue() public view returns (uint) {
      return value;
    }

    function onAccept(uint32 queryId, uint32 _value) public {
      require(msg.sender == oracleHub, 101);
      // If you send multiple requests you may want to check queryId
      value = _value;
    }

    // Function to receive plain transfers.
    receive() external {
    }

}

