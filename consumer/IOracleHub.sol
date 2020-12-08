pragma solidity >= 0.6.0;
interface IOracleHub {
  function requestData(uint32 handlerId, uint32 queryId, uint32 oracleId) external functionID(502);
  function registerOracle(uint256 pubkey, uint32 queryId, uint16 timeout) external functionID(501);
  function topUpOracle(uint32 oracleId) external functionID(503);
  function claimUnprovidedData(uint32 handlerId, uint32 successHandlerId, uint32 queryId, uint32 oracleId) external functionID(504);

}

