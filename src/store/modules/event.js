import { getEvents, getEventsTypes, getMainEvents, getSubEvents, getEventCoverTypes, getEvent, getEventsList, removeEvent, removeEventImage, removeEventVideo, getGiveawaysOfEvents, getOffersOfEvents, getEventHistory } from '../../website/helpers/APIsHelper';
import types from '../types';

const state = {
    eventsData: [],
    eventsTypes: [],
    eventHistory: [],
    mainEventsData: [],
    subEventsData: [],
    eventCoverTypes: [],
    eventDetails: {},
    eventsList: [],
    giveawaysForEventList: [],
    offersForEventList: [],
    isEventsFetched: false,
    isEventHistoryFetched: false,
    isEventsListFetched: false,
    isEventTypeFetched: false,
    isMainEventsFetched: false,
    isSubEventsFetched: false,
    isEventCoverTypesFetched: false,
    isEventDetailsFetched: false,
    isEventGiveawaysFetched: false,
    isEventOffersFetched: false,
};

const mutations = {
    [types.events.mutations.SET_EVENTS_DATA]: (currentState, payload) => {
        currentState.eventsData = payload;
    },
    [types.events.mutations.SET_EVENT_HISTORY]: (currentState, payload) => {
        currentState.eventHistory = payload;
    },
    [types.events.mutations.SET_EVENTS_LIST]: (currentState, payload) => {
        currentState.eventsList = payload;
    },
    [types.events.mutations.SET_EVENT_TYPE_DATA]: (currentState, payload) => {
        currentState.eventsTypes = payload;
    },
    [types.events.mutations.SET_MAIN_EVENTS_DATA]: (currentState, payload) => {
        currentState.mainEventsData = payload;
    },
    [types.events.mutations.SET_SUB_EVENTS_DATA]: (currentState, payload) => {
        currentState.subEventsData = payload;
    },
    [types.events.mutations.SET_EVENT_COVER_TYPES]: (currentState, payload) => {
        currentState.eventCoverTypes = payload;
    },
    [types.events.mutations.SET_EVENT_DETAILS]: (currentState, payload) => {
        currentState.eventDetails = payload;
    },
    [types.events.mutations.SET_EVENT_GIVEAWAYS]: (currentState, payload) => {
        currentState.giveawaysForEventList = payload;
    },
    [types.events.mutations.SET_EVENT_OFFERS]: (currentState, payload) => {
        currentState.offersForEventList = payload;
    },
    [types.events.mutations.SET_IS_EVENT_GIVEAWAYS_FETCHED]: (currentState, payload) => {
        currentState.isEventGiveawaysFetched = payload;
    },
    [types.events.mutations.SET_IS_EVENT_OFFERS_FETCHED]: (currentState, payload) => {
        currentState.isEventOffersFetched = payload;
    },
    [types.events.mutations.SET_IS_EVENT_HISTORY_FETCHED]: (currentState, payload) => {
        currentState.isEventHistoryFetched = payload;
    },
    [types.events.mutations.SET_IS_EVENTS_FETCHED]: (currentState, payload) => {
        currentState.isEventsFetched = payload;
    },
    [types.events.mutations.SET_IS_EVENTS_LIST_FETCHED]: (currentState, payload) => {
        currentState.isEventsListFetched = payload;
    },
    [types.events.mutations.SET_IS_EVENT_TYPE_FETCHED]: (currentState, payload) => {
        currentState.isEventTypeFetched = payload;
    },
    [types.events.mutations.SET_IS_MAIN_EVENTS_FETCHED]: (currentState, payload) => {
        currentState.isMainEventsFetched = payload;
    },
    [types.events.mutations.SET_IS_SUB_EVENTS_FETCHED]: (currentState, payload) => {
        currentState.isSubEventsFetched = payload;
    },
    [types.events.mutations.SET_IS_EVENT_COVER_TYPES_FETCHED]: (currentState, payload) => {
        currentState.isEventCoverTypesFetched = payload;
    },
    [types.events.mutations.SET_IS_EVENT_DETAILS_FETCHED]: (currentState, payload) => {
        currentState.isEventDetailsFetched = payload;
    },
    [types.events.mutations.REMOVE_DELETED_EVENT]: (currentState, index) => {
        currentState.eventsData.splice(index, 1);
    },
};

const getEventsData = async ({ commit }) => {
    commit(types.home.mutations.SET_SPINNER_FLAG, true);
    const response = await getEvents().then((response) => {
        commit(types.events.mutations.SET_EVENTS_DATA, response.data.events);
        commit(types.events.mutations.SET_IS_EVENTS_FETCHED, true);
        commit(types.home.mutations.SET_SPINNER_FLAG, false);
        return true
    }).catch(() => false);
    return response
};

const getEventTypes = async ({ commit }) => {
    const response = await getEventsTypes().then((response) => {
        commit(types.events.mutations.SET_EVENT_TYPE_DATA, response.data.types);
        commit(types.events.mutations.SET_IS_EVENT_TYPE_FETCHED, true);
        return true
    }).catch(() => false);
    return response
};

const getMainEventsData = async ({ commit }) => {
    const response = await getMainEvents().then((response) => {
        commit(types.events.mutations.SET_MAIN_EVENTS_DATA, response.data.events);
        commit(types.events.mutations.SET_IS_MAIN_EVENTS_FETCHED, true);
        return true
    }).catch(() => false);
    return response
};

const getSubEventsData = async ({ commit }) => {
    const response = await getSubEvents().then((response) => {
        commit(types.events.mutations.SET_SUB_EVENTS_DATA, response.data.events);
        commit(types.events.mutations.SET_IS_SUB_EVENTS_FETCHED, true);
        return true
    }).catch(() => false);
    return response
};

const getEventCoverTypesData = async ({ commit }) => {
    const response = await getEventCoverTypes().then((response) => {
        commit(types.events.mutations.SET_EVENT_COVER_TYPES, response.data.types);
        commit(types.events.mutations.SET_IS_EVENT_COVER_TYPES_FETCHED, true);
        return true
    }).catch(() => false);
    return response
};

const getEventDetails = async ({ commit }, eventId) => {
    commit(types.home.mutations.SET_SPINNER_FLAG, true);
    const response = await getEvent(eventId).then((response) => {
        commit(types.events.mutations.SET_EVENT_DETAILS, response.data.event);
        commit(types.home.mutations.SET_SPINNER_FLAG, false);
        commit(types.events.mutations.SET_IS_EVENT_DETAILS_FETCHED, true);
        return true
    }).catch(() => false);
    return response
};

const getEventGiveaways = async ({ commit }, eventId) => {
    commit(types.home.mutations.SET_SPINNER_FLAG, true);
    const response = await getGiveawaysOfEvents(eventId).then((response) => {
        commit(types.events.mutations.SET_EVENT_GIVEAWAYS, response.data.giveaways);
        commit(types.home.mutations.SET_SPINNER_FLAG, false);
        commit(types.events.mutations.SET_IS_EVENT_GIVEAWAYS_FETCHED, true);
        return true
    }).catch(() => false);
    return response
};

const getEventOffers = async ({ commit }, eventId) => {
    commit(types.home.mutations.SET_SPINNER_FLAG, true);
    const response = await getOffersOfEvents(eventId).then((response) => {
        commit(types.events.mutations.SET_EVENT_OFFERS, response.data.offers);
        commit(types.home.mutations.SET_SPINNER_FLAG, false);
        commit(types.events.mutations.SET_IS_EVENT_OFFERS_FETCHED, true);
        return true
    }).catch(() => false);
    return response
};

const getEventHistoryData = async ({ commit }, eventId) => {
    commit(types.home.mutations.SET_SPINNER_FLAG, true);
    const response = await getEventHistory(eventId).then((response) => {
        commit(types.events.mutations.SET_EVENT_HISTORY, response.data.history);
        commit(types.home.mutations.SET_SPINNER_FLAG, false);
        commit(types.events.mutations.SET_IS_EVENT_HISTORY_FETCHED, true);
        return true
    }).catch(() => false);
    return response
};

const getEventsListForDashboard = async ({ commit }) => {
    const response = await getEventsList().then((response) => {
        commit(types.events.mutations.SET_EVENTS_LIST, response.data.events);
        commit(types.events.mutations.SET_IS_EVENTS_LIST_FETCHED, true);
        return true
    }).catch(() => false);
    return response
};

const deleteEvent = async ({ commit }, payload) => {
    const { eventId, locationInDataArray } = payload
    commit(types.home.mutations.SET_SPINNER_FLAG, true);
    const response = await removeEvent(eventId).then(() => {
        commit(types.events.mutations.REMOVE_DELETED_EVENT, locationInDataArray);
        commit(types.home.mutations.SET_SPINNER_FLAG, false);
        return true
    }).catch(() => false);
    return response
};

const deleteEventImage = async ({ commit }, payload) => {
    const { eventId, imageId } = payload
    commit(types.home.mutations.SET_SPINNER_FLAG, true);
    const response = await removeEventImage(eventId, imageId).then(() => {
        commit(types.home.mutations.SET_SPINNER_FLAG, false);
        return true
    }).catch(() => false);
    return response
};

const deleteEventVideo = async ({ commit }, payload) => {
    const { eventId, videoId } = payload
    commit(types.home.mutations.SET_SPINNER_FLAG, true);
    const response = await removeEventVideo(eventId, videoId).then(() => {
        commit(types.home.mutations.SET_SPINNER_FLAG, false);
        return true
    }).catch(() => false);
    return response
};

const actions = {
    [types.events.actions.FETCH_EVENTS]: getEventsData,
    [types.events.actions.FETCH_EVENT_TYPE]: getEventTypes,
    [types.events.actions.FETCH_MAIN_EVENTS]: getMainEventsData,
    [types.events.actions.FETCH_SUB_EVENTS]: getSubEventsData,
    [types.events.actions.FETCH_EVENT_HISTORY]: getEventHistoryData,
    [types.events.actions.FETCH_EVENT_COVER_TYPES]: getEventCoverTypesData,
    [types.events.actions.FETCH_EVENT_DETAILS]: getEventDetails,
    [types.events.actions.FETCH_EVENT_GIVEAWAYS]: getEventGiveaways,
    [types.events.actions.FETCH_EVENT_OFFERS]: getEventOffers,
    [types.events.actions.FETCH_EVENT_LIST]: getEventsListForDashboard,
    [types.events.actions.DELETE_EVENT]: deleteEvent,
    [types.events.actions.DELETE_EVENT_IMAGE]: deleteEventImage,
    [types.events.actions.DELETE_EVENT_VIDEO]: deleteEventVideo,
};

export default {
    state,
    mutations,
    actions
};
