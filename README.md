# OracleHub
One of the key problems of applications on the blockchain is that inherently those applications may work only with on-chain data. Thus if you need to connect your smart-contract with real world items, commodities or events you need to create Oracle: agent which streams information about real-world on chain. Often those oracles are the main points of failures.

OracleHub aims to mitigate this issue by creating transparent registry of independent oracles. Thus end-user may compare different oracles and chose the best ones. At the same time OracleHub provides support for oracles and allows them to focus on providing data only, without maintaining it's own infrastructure.

How it works?
1. Smart-contract sends `get_data` internal message to OracleHub.
2. OracleHub emit log message to notify oracle.
3. Special software created by OracleHub monitors logs and when it finds corresponding logs start process of answering the query.
4. Once answer is found, it is emitted as external message to OracleHub. Thus Oracle itself does not need to maintain hotwallets and create internal messages. It serves purely as web-server: get request, send response.
5. Once external message reaches OracleHub, authentication is checked and if everything is ok, smart-contract from step one gets internal message with data and oracle get money to its OracleHub account.

# OracleHub contract
OracleHub contract is deployed on rubynet and freeton mainnet, although you may deploy your own one:

FreeTON mainnet `0:0:42bd8b64ce188e7f59751c4f71e69f6a909e5e87c83741314b63605a8103a011`

rubynet `0:731417792a258afec8696ccf0e1490025a6a3c296e9d107b355e1c6667b5dc34`

# OracleHub consumer
In directory `./consumer` example Solidity contract which can be used to retrieve oracle data is presented.

# Oracle Server
Instruction for setup your own oracle may be found in `./oracle_server`
