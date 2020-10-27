from server import run_server, Cell
import requests
private_key = b'\x00'*32
oracle_id = 1

handler = lambda x: Cell()


def handler(x):
  btc_usd_price = 0
  ton_btc_price = 0
  k_crystal_usd_price = 0
  try:
    response = requests.get('https://api.coindesk.com/v1/bpi/currentprice.json')
    price_data = response.json()
    btc_usd_price = int(price_data['bpi']['USD']['rate_float']*100)
    response = requests.get('http://exchange-open-api.coineal.com/open/api/get_ticker?symbol=tonbtc')
    price_data = response.json()
    ton_btc_price = price_data["data"]["last"]
    k_crystal_usd_price = int(ton_btc_price*btc_usd_price*1e3)
  except:
    pass
  answer = Cell()
  answer.data.put_arbitrary_uint(k_crystal_usd_price, 32)
  return answer

run_server(oracle_id, private_key, handler)


