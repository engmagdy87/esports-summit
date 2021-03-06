import {
    getSponsorsForDashboard,
    getSponsors,
    removeSponsor,
    removeSponsorImage,
    getSponsorsForFooter
} from '../../website/helpers/APIsHelper';
import types from '../types';

const state = {
    sponsorsData: [],
    isSponsorsDataFetched: false,
    dashboardSponsorsData: [],
    isDashboardSponsorsDataFetched: false,
    footerSponsorsData: [],
    isFooterSponsorsDataFetched: false,
};

const mutations = {
    [types.sponsors.mutations.SET_SPONSORS_DATA]: (currentState, payload) => {
        currentState.sponsorsData = payload;
    },
    [types.sponsors.mutations.SET_IS_SPONSORS_DATA_FETCHED]: (currentState, payload) => {
        currentState.isSponsorsDataFetched = payload;
    },
    [types.sponsors.mutations.SET_DASHBOARD_SPONSORS_DATA]: (currentState, payload) => {
        currentState.dashboardSponsorsData = payload;
    },
    [types.sponsors.mutations.SET_IS_DASHBOARD_SPONSORS_DATA_FETCHED]: (currentState, payload) => {
        currentState.isDashboardSponsorsDataFetched = payload;
    },
    [types.sponsors.mutations.SET_FOOTER_SPONSORS_DATA]: (currentState, payload) => {
        currentState.footerSponsorsData = payload;
    },
    [types.sponsors.mutations.SET_IS_FOOTER_SPONSORS_DATA_FETCHED]: (currentState, payload) => {
        currentState.isFooterSponsorsDataFetched = payload;
    },
    [types.sponsors.mutations.REMOVE_DELETED_SPONSOR]: (currentState, index) => {
        currentState.sponsorsData.splice(index, 1);
    },
};

const getSponsorsData = async ({ commit },) => {
    commit(types.home.mutations.SET_SPINNER_FLAG, true);
    const response = await getSponsors().then((response) => {
        commit(types.sponsors.mutations.SET_SPONSORS_DATA, response.data.sponsors);
        commit(types.sponsors.mutations.SET_IS_SPONSORS_DATA_FETCHED, true);
        commit(types.home.mutations.SET_SPINNER_FLAG, false);
        return true
    }).catch(() => false);
    return response
};

const getFooterSponsorsData = async ({ commit },) => {
    commit(types.home.mutations.SET_SPINNER_FLAG, true);
    const response = await getSponsorsForFooter().then((response) => {
        commit(types.sponsors.mutations.SET_FOOTER_SPONSORS_DATA, response.data);
        commit(types.sponsors.mutations.SET_IS_FOOTER_SPONSORS_DATA_FETCHED, true);
        commit(types.home.mutations.SET_SPINNER_FLAG, false);
        return true
    }).catch(() => false);
    return response
};

const getSponsorsDataForDashboard = async ({ commit },) => {
    const response = await getSponsorsForDashboard().then((response) => {
        commit(types.sponsors.mutations.SET_DASHBOARD_SPONSORS_DATA, response.data.sponsors);
        commit(types.sponsors.mutations.SET_IS_DASHBOARD_SPONSORS_DATA_FETCHED, true);
        return true
    }).catch(() => false);
    return response
};

const deleteSponsor = async ({ commit }, payload) => {
    const { sponsorId, locationInDataArray } = payload
    commit(types.home.mutations.SET_SPINNER_FLAG, true);
    const response = await removeSponsor(sponsorId).then(() => {
        commit(types.sponsors.mutations.REMOVE_DELETED_SPONSOR, locationInDataArray);
        commit(types.home.mutations.SET_SPINNER_FLAG, false);
        return true
    }).catch(() => false);
    return response
};

const deleteSponsorImage = async ({ commit }, payload) => {
    const { sponsorId, imageId } = payload
    commit(types.home.mutations.SET_SPINNER_FLAG, true);
    const response = await removeSponsorImage(sponsorId, imageId).then(() => {
        commit(types.home.mutations.SET_SPINNER_FLAG, false);
        return true
    }).catch(() => false);
    return response
};

const actions = {
    [types.sponsors.actions.FETCH_SPONSORS]: getSponsorsData,
    [types.sponsors.actions.FETCH_FOOTER_SPONSORS]: getFooterSponsorsData,
    [types.sponsors.actions.FETCH_SPONSORS_FOR_DASHBOARD]: getSponsorsDataForDashboard,
    [types.sponsors.actions.DELETE_SPONSOR]: deleteSponsor,
    [types.sponsors.actions.DELETE_SPONSOR_IMAGE]: deleteSponsorImage,
};

export default {
    state,
    mutations,
    actions
};
