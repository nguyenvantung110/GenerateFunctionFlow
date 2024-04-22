import { MUTATION } from "./mutation-types";
import { ACTION } from "./action-types";
import axios, { AxiosResponse } from "axios";

interface State {
  menuFlgs: Record<string, any>;
}

const state: State = {
  menuFlgs: {}
};

const getters = {
  menuFlgs: (state: State) => {
    return state.menuFlgs;
  }
};

const actions = {
  async [ACTION.GET_MENU_FLGS]({ commit }: { commit: Function }) {
    await axios
      .get("menus")
      .then((res: AxiosResponse<Record<string, any>>) => {
        commit(MUTATION.UPDATE, {
          menuFlgs: res.data
        });
      })
      .catch((err: Error) => {
        throw err;
      });
  }
};

interface MutationPayload {
  menuFlgs: Record<string, any>;
}

const mutations = {
  [MUTATION.UPDATE](state: State, { menuFlgs }: MutationPayload) {
    state.menuFlgs = menuFlgs;
  }
};

export default {
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};