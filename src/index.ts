import { 
  SearchResult,
  MenuOption,
  PosterDetail,
  MenuPosition,
  CloseType,
  ShareType,
  Bridge,
} from './interface/bridge';

import Browser from './impl/browser/bridge';
import Native from './impl/native/bridge';

let instance: Bridge = null;

const mount = function (bridge: Bridge) {
  instance = bridge;
}

const {
  openSearch,
  toggleSearch,
} = instance;

export {
  Browser,
  Native,
  mount,

  openSearch,
  toggleSearch,

  SearchResult,
  MenuOption,
  PosterDetail,
  MenuPosition,
  CloseType,
  ShareType,
}
