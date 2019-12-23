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
OracleHub contract is deployed on:
`0:bc2b1afd7b59a288293e2b72d43ed02c50c3421f09c46ac34544e5a3f4b6c152`

# Oracle Server
Instruction for setup your own oracle may be found in `./oracle_server`
