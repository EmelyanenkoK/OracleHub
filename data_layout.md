internal:
  register_oracle (public_key, price_per_request)
  get_data (query_id, oracle_id, request_data)
  top_up_oracle(oracle_id)
  claim_unprovided_data(query_id)
  

external:
  provide_data (oracle)
  withdraw_money (oracle)
  admin_withdraw (admin)
  remove_expired (admin)




storage:

PRIMITIVES
oracle_data:
  public_key(256), balance, price_per_request, timeout(16), seqno, total_request_num, success_request_num
internal_query_index: 
  hash(requester_address)[:32], requested_query_id(64)
request_data:
  oracle_id, return_grams, fee, expiration_time, requester_address


pubkey
oracle_dict: index -> oracle_data
requests_dict: internal_query_index -> request_data
  
