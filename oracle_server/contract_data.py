from server import run_server, Cell, client, deserialize_boc

private_key = b'\x00'*32
oracle_id = 2

query_template = '''
query {
  accounts(filter:{id:{eq:"%(address)s"}}) {
    data
  }
}
'''

def handler(x): 
  response = Cell()
  try:
    address = x.data.read_address()
    query = query_template % {'address': address.raw}
    result = json.loads(client.execute(query))
    boc = result["data"]["accounts"][0]["data"]
    response = deserialize_boc(boc)
  except:
    pass
  return response
  
run_server(oracle_id, private_key, handler)

