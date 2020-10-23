from server import run_server, Cell
import requests
private_key = b'\x00'*32
oracle_id = 1

handler = lambda x: Cell()


def handler(x): 
  price = 0
  try:
    response = requests.get('https://api.coindesk.com/v1/bpi/currentprice.json')
    price_data = response.json()
    price = int(x['bpi']['USD']['rate_float']*100)
  except:
    pass
  answer = Cell()
  answer.data.put_arbitrary_uint(price, 32)
  return answer
  
run_server(1, private_key, handler)

