from server import run_server, Cell
import requests
private_key = b'\x00'*32
oracle_id = 4

handler = lambda x: Cell()


def handler(x): 
  blockhash = 0
  try:
    height = x.data.read_uint32()
    response = requests.get('https://insight.bitpay.com/api/block-index/%d'%height)
    block_hash = response.json()["blockHash"]
    blockhash = int(block_hash, 16)
  except:
    pass
  answer = Cell()
  answer.data.put_arbitrary_uint(blockhash, 256)
  return blockhash
  
run_server(oracle_id, private_key, handler)

