let db = window['localStorage'];

const StorageAvailable = (type) => {
  let storage;

  try {
    storage = window[type];
    let x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (
      e.code === 22 ||
      e.code === 1014 ||
      e.name === 'QuotaExceededError' ||
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') && 
      (storage && storage.length !== 0);
  }
}

// Storage:
// 
// pc_nbr: int
// pc0_name: string
// pc0_str: int
// pc0_last_used: string
// pc0_stun: int
// pc0_wound: int
// pc0_incapacited: int
// pc0_mortally: int
// pc0_prone: boolean
// pc0_statuslvl: int

// const InitStorage = (pcName, pcSTR) => {
//   let db = window['localStorage'];

//   db.setItem('pc_nbr', 1);
// }

const PopulateStorage = (pcName, pcSTR) => {
  let pcNbr = db.getItem('pc_nbr');

  pcNbr = (!pcNbr) ? 1 : parseInt(pcNbr) + 1;

  db.setItem(`pc${pcNbr - 1}_id`, pcNbr - 1);
  db.setItem(`pc${pcNbr - 1}_name`, pcName);
  db.setItem(`pc${pcNbr - 1}_str`, pcSTR);
  db.setItem(`pc${pcNbr - 1}_last_used`, new Date().toLocaleDateString());
  db.setItem(`pc${pcNbr - 1}_stun`, 0);
  db.setItem(`pc${pcNbr - 1}_wound`, 0);
  db.setItem(`pc${pcNbr - 1}_incapacited`, 0);
  db.setItem(`pc${pcNbr - 1}_mortally`, 0);
  db.setItem(`pc${pcNbr - 1}_prone`, false);
  db.setItem(`pc${pcNbr - 1}_statuslvl`, 0);
  db.setItem('pc_nbr', pcNbr);
  return pcNbr;
}

const getPCList = () => {
  let pcNbr = parseInt(db.getItem('pc_nbr'));

  let res = [];
  for (let x = 0;x < pcNbr;x++) {
    let tmp = {};
    tmp.id = db.getItem(`pc${x}_id`);
    tmp.name = db.getItem(`pc${x}_name`);
    tmp.str = db.getItem(`pc${x}_str`);
    tmp.last_used = db.getItem(`pc${x}_last_used`);
    tmp.statuslvl = db.getItem(`pc${x}_statuslvl`);
    res.push(tmp);
  }
  return res;
}

const checkPCNameIsUnique = (pcName) => {
  for (let x = 0;x <= db.getItem('pc_nbr');x++) {
    // if (db.getItem(`pc${x}_name`))
    if (pcName === db.getItem(`pc${x}_name`))
      return false;
  }
  return true;
}

const updatePC = (pcID, data) => {
  console.log(data);

  data.forEach(elem => {
    console.log(`pc${pcID}_${elem.key}`,  elem.value)
    db.setItem(`pc${pcID}_${elem.key}`,  elem.value)
  });
  console.log('new value?:', getPC(pcID))
}

const getPC = (pcID) => {

  return (
    {
      id: db.getItem(`pc${pcID}_id`),
      name: db.getItem(`pc${pcID}_name`),
      str: parseInt(db.getItem(`pc${pcID}_str`)),
      last_used: db.getItem(`pc${pcID}_last_used`),
      stun: parseInt(db.getItem(`pc${pcID}_stun`)),
      wound: parseInt(db.getItem(`pc${pcID}_wound`)),
      incapacited: parseInt(db.getItem(`pc${pcID}_incapacited`)),
      mortally: parseInt(db.getItem(`pc${pcID}_mortally`)),
      prone: db.getItem(`pc${pcID}_prone`),
      statuslvl: parseInt(db.getItem(`pc${pcID}_statuslvl`)),
    }
  );
}

export { 
  StorageAvailable, 
  checkPCNameIsUnique,
  updatePC,
  getPC,
  PopulateStorage,
  getPCList, 
};