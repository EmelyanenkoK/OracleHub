# Oracle creation

To create your own oracle you need some grams for registration in oracle_hub and python for running oracle server.

## Oracle registration
0. Create private key for your oracle. Use `generate-key-pair.fif`
Example:
```
generate-key-pair.fif oracle_key
```
It will show you oracle public key as integer
1. Use `register-oracle.fif` as follows:
```
fift -s register_oracle.fif <public_key_as_integer> <fee_in_nanograms> <timeout>
```
Fee in nanograms is the fee which your oracle will get for each successfull response.
Timeout is the period after which contract which requested data and didn't get response can claim his money back. Note that users prefer faster oracles. Also note that timeout cannot be higher than 65536 sec.
2. After that, find `oracle_id` you got. It is possilbe because after successfull registration oracle_hub emit log message with destination address equal to your public key.
For instance you may use testnet.ton.dev GraphQL service provided by TonLabs. Use the following query:
```
query {
  messages (filter: {src: {eq: "0:bc2b1afd7b59a288293e2b72d43ed02c50c3421f09c46ac34544e5a3f4b6c152"}, msg_type: {eq: 2}},
  ) {
    dst
    body
  }
}
```
Body contains your 32bit oracle id.
3. Setup server. Note, you need install via pip3 the following packages: `tvm_valuetypes nacl graphqlclient`. You may find example of oracle server in `example.py`. Don't forget to fill in private key obtained by step 0. Also you need to implement your own `handle` function which get Cell with request and return Cell with response. 

Start to connect TON Blockchain with your own service and the real world events!
