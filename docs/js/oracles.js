const t = new TonWeb();
const networks = {ruby: {server:'net', hub:'0:731417792a258afec8696ccf0e1490025a6a3c296e9d107b355e1c6667b5dc34'},
                    testnet: {server:'testnet', hub:'0:bc2b1afd7b59a288293e2b72d43ed02c50c3421f09c46ac34544e5a3f4b6c152'},
                    freeton: {server:'main', hub:'0:42bd8b64ce188e7f59751c4f71e69f6a909e5e87c83741314b63605a8103a011'}
                   };


const getQuery = (hubAddress) => {
  return `query {
   accounts(filter:{id:{eq:"${hubAddress}"}}) {
    data
   }
  }`;
};



const loadStorage = async (server, hub) => {
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: getQuery(hub)
    })
  };

  let res = await fetch(`https://${server}.ton.dev/graphql`, options);
  let st = await res.json();
  return st.data.accounts[0].data;
}

function parseOracleData(packedData) {
    const result = {};
    result.publicKey = packedData.bits.readBitstring(256);
    result.balance = packedData.bits.readGrams().toNumber();
    result.pricePerRequest = packedData.bits.readGrams().toNumber();
    result.timeout = packedData.bits.readUint(16).toNumber();
    result.seqNo = packedData.bits.readUint(32).toNumber();
    result.totalRequestNum = packedData.bits.readUint(32).toNumber();
    result.successRequestNum = packedData.bits.readUint(32).toNumber();
    console.log(result)
    return result;
}

const loadOracles = async (network) => {

  cd = t.utils.base64ToBytes(await loadStorage(networks[network].server, networks[network].hub));
  oracle_hub_data = t.boc.Cell.fromBoc(cd)[0];
  oracle_dict = oracle_hub_data.refs[0]
  parsedDict = t.boc.parseDict(oracle_dict, "uint32")
  return parsedDict;
}

const fillOracleDetails = (oracleId, details) => {
  let table = document.getElementById("oracleDetails");
  while(table.rows.length>0)
    table.deleteRow(0);  
  console.log(oracleId, details);
  //pk
  let row = table.insertRow();
  let h = row.insertCell(), v = row.insertCell();
  h.innerHTML = "Public key";
  v.innerHTML = details.publicKey.toHex();
  v.classList.add("longHex");
  for(let i of ["balance", "pricePerRequest"]) {
    row = table.insertRow();
    h = row.insertCell(), v = row.insertCell();
    h.innerHTML = i;
    h.classList.add("longHeader");
    v.innerHTML = `${details[i]/1e9} TON Crystalls`;
  }
  for(let i of ["seqNo", "successRequestNum", "totalRequestNum"]) {
    row = table.insertRow();
    h = row.insertCell(), v = row.insertCell();
    h.innerHTML = i;
    h.classList.add("longHeader");
    v.innerHTML = `${details[i]}`;
  }
  row = table.insertRow();
  h = row.insertCell(), v = row.insertCell();
  h.innerHTML = "timeout";
  v.innerHTML = `${details.timeout} sec`;
  table.style.display="block";
  
};

const updateTable = async () => {
  const network = document.getElementById("network").checked? "freeton" : "ruby";
  document.getElementById("contractAddress").innerHTML = networks[network].hub;
  const tonlivePrefix = network == "ruby" ? "net" : "main";
  document.getElementById("contractAddress").href = `https://${tonlivePrefix}.ton.live/accounts?section=details&id=${networks[network].hub}`
  const table = document.getElementById("oracles");
  while(table.rows.length>1)
    table.deleteRow(1);
  let data = [];
  try {
    data = await loadOracles(network);
  } catch {};

  for(let oracle_id in data) {
    const oracleData = data[oracle_id]
    const oracleParams = parseOracleData(oracleData);
    const row = table.insertRow();
    const idCell = row.insertCell();
    const nameCell = row.insertCell();
    const infoCell = row.insertCell();
    const priceCell = row.insertCell();
    const statsCell = row.insertCell();
    idCell.innerHTML = String(oracle_id);
    if(oracle_id==0) {
      nameCell.innerHTML = "BitcoinUSDPrice";
      infoCell.innerHTML = "Returns bitcoin usd price in cents based on coindesk.com";
    }
    if(oracle_id==1) {
      nameCell.innerHTML = "TonCrystalsUSDPrice";
      infoCell.innerHTML = "Returns price of 1000 Ton Crystals in USD cents on coineal";
    }
    priceCell.innerHTML = String(oracleParams.pricePerRequest/1e9) + " TON Crystals";
    statsCell.innerHTML = String(oracleParams.successRequestNum) + " / " + String(oracleParams.totalRequestNum);
    nameCell.classList.add("semi-collapsable");
    infoCell.classList.add("collapsable");
    priceCell.classList.add("collapsable");
    row.addEventListener("click",()=>fillOracleDetails(oracle_id, oracleParams));
  }
}
updateTable();
setInterval(updateTable, 45000);
document.getElementById("network").addEventListener("change",updateTable);
