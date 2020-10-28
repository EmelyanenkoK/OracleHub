from server import run_server, Cell, default_network_params
private_key = b'\x00'*32
oracle_id = 1

handler = lambda x: Cell()
run_server(default_network_params, oracle_id, private_key, handler)

