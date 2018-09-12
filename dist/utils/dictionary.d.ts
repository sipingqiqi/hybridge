declare const dictionary: {};
declare function KVtoNV(item: Array<any> | any): Array<any> | any;
declare function setDictionary(type: string): Promise<any>;
declare function setAllDictionary(): void;
declare function getDictionary(type: string): Promise<string>;
declare function findDictionary(target: Array<any> | any, query: any): any;
declare function _findDictionary(target: Array<any> | any, query: any): any;
export { dictionary, KVtoNV, setDictionary, setAllDictionary, getDictionary, findDictionary, _findDictionary, };
