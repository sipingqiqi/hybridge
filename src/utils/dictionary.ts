declare var window: Window & {
  findDictTable: (type: string) => Promise<string>
}

const dictionary = {}

function KVtoNV(item: Array<any> | any): Array<any> | any {
  if (Array.isArray(item)) {
    return item.map(node => this.KVtoNV(node));
  } else {
    return Object.assign({}, item, { value: item.key, name: item.value });
  }
}

function setDictionary(type: string): Promise<any> {
  return new Promise<string>((resolve, reject) => {
    if (window.findDictTable) {
      window.findDictTable(type).then(json => {
        const dict = JSON.parse(json);
        dictionary[dict.name] = KVtoNV(dict.item);
        resolve(dict);
      })
    } else {
      reject('Cannot find function: window.findDictTable()');
    }
  });
}

function setAllDictionary(): void {
  const types = [
    // "occupation",        // 职业列表
    // "area",              // 全国地址字典数据类型
    "post_type",         // 保单寄送类型
    "preserve",          // 保全类型
    "sales_channel",      // 销售渠道
    "relation",         // 家庭关系
    "bankcode",          // 银行卡列表
    "benefit_type",      // 受益人类型
    "card_type",         // 证件类型
    "citizenship",       // 国家列表
    "cover",             // 封面类型
    "degree",            // 学历列表
    "coverage_state",    // coverage_state
    "gender",            // 性别
    "insure_state",      // 保单状态
    "marriage",          // 婚姻情况列表
    "nation",            // 民族
    "payment",           // 支付类型
    "policy_channel",    // 保险渠道
    "occupation_level"  // 职业等级列表
  ]

  if (window.findDictTable) {
    types.map(type => {
      window.findDictTable(type).then(json => {
        const dict = JSON.parse(json);
        dictionary[dict.name] = KVtoNV(dict.item);
      })
    });
  }
}

function getDictionary(type: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    setDictionary(type).then(obj => {
      if (obj) {
        resolve(obj);
      } else {
        reject(`Cannot get dictionary: ${type}`);
      }
    })
  });
}

function findDictionary(target: Array<any> | any, query: any): any {
  function find(target, key, value) {
    if (typeof target !== 'object') {
      return null;
    }
    if (Array.isArray(target)) {
      let ret = null;
      target.forEach(v => {
        ret = (ret === null) ? find(v, key, value) : ret;
      })
      return ret;
    } else {
      return target[key] === value ? target : null;
    }
  }

  const keys = Object.keys(query);
  return keys.length > 0 ? find(target, keys[0], query[keys[0]]) : null;
}

function _findDictionary(target: Array<any> | any, query: any): any {
  function find(target, key, value) {
    if (typeof target !== 'object') {
      return null;
    }
    if (Array.isArray(target)) {
      let ret = null;
      target.forEach(v => {
        ret = (ret === null) ? find(v, key, value) : ret;
      })
      return ret;
    } else {
      return target[key].indexOf(value) ? target : null;
    }
  }

  const keys = Object.keys(query);
  return keys.length > 0 ? find(target, keys[0], query[keys[0]]) : null;
}

// function find(list: Array<any> | any, invoke: (item, key, list) => boolean): any {
//   return Array.isArray(list) ? list.find(invoke) : Object.keys(list).find(key => invoke(list[key], key, list));
// }

// function findDict(list: Array<any> | any, by: any): any {
//   return find(list, item => Object.keys(by).every(key => item[key] === by[key]));
// }

export {
  dictionary,
  KVtoNV,
  setDictionary,
  setAllDictionary,
  getDictionary,
  findDictionary,
  _findDictionary,
}
