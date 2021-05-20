import {
  getStory,
  getSummitHistoryGames
} from "../../website/helpers/APIsHelper";
import types from "../types";

const state = {
  storyData: {},
  isStoryFetched: false,
  summitHistoryGames: [],
  isSummitHistoryGamesFetched: false
};

const mutations = {
  [types.story.mutations.SET_STORY_DATA]: (currentState, payload) => {
    currentState.storyData = payload;
  },
  [types.story.mutations.SET_IS_STORY_FETCHED]: (currentState, payload) => {
    currentState.isStoryFetched = payload;
  },
  [types.story.mutations.SET_SUMMIT_HISTORY_GAMES]: (currentState, payload) => {
    currentState.summitHistoryGames = payload;
  },
  [types.story.mutations.SET_IS_SUMMIT_HISTORY_GAMES_FETCHED]: (
    currentState,
    payload
  ) => {
    currentState.isSummitHistoryGamesFetched = payload;
  }
};

const getSummitStory = async ({ commit }) => {
  commit(types.home.mutations.SET_SPINNER_FLAG, true);
  const response = await getStory()
    .then(response => {
      commit(types.story.mutations.SET_STORY_DATA, response.data.summit);

      commit(types.story.mutations.SET_IS_STORY_FETCHED, true);

      commit(types.home.mutations.SET_SPINNER_FLAG, false);
      return true;
    })
    .catch(() => false);
  return response;
};

const getSummitHistoryGamesData = async ({ commit }, summitId) => {
  const response = await getSummitHistoryGames(summitId)
    .then(response => {
      commit(
        types.story.mutations.SET_SUMMIT_HISTORY_GAMES,
        response.data.data.games
      );
      commit(types.story.mutations.SET_IS_SUMMIT_HISTORY_GAMES_FETCHED, true);
      return true;
    })
    .catch(() => false);
  return response;
};

const actions = {
  [types.story.actions.FETCH_STORY]: getSummitStory,
  [types.story.actions.FETCH_SUMMIT_HISTORY_GAMES]: getSummitHistoryGamesData
};

export default {
  state,
  mutations,
  actions
};
