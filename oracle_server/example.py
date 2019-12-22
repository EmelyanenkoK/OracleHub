from server import run_server, Cell
private_key = b'\x00'*32
oracle_id = 1

handler = lambda x: Cell()
run_server(1, private_key, handler)

