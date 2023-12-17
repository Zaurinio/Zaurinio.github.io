import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            currentPageUsers: [],
            filterValue: '',
            pagesQty: 0,
            currentPageNumber: 1,
            dataIsLoading: false,
        }
    },
    mutations: {
        setCurrentUsers(state, payload) {
            const users = payload.map(user => {
                const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
                let format = '+44 (xxx) xxx-xxxx';
                for (var i = 0; i < numbers.length; i++) {
                    format = format.replace('x', numbers[i])
                }
                return {
                    ...user,
                    open: false,
                    phone: format,
                }
            })
            state.currentPageUsers = users;
        },
        setPagesQty(state, payload) {
            state.pagesQty = payload;
        },
        setCurrentPageNumber(state, payload) {
            state.currentPageNumber = payload;
        },
        setAccordionStatus(state, payload) {
            const updatedUsers = state.currentPageUsers.map(user => {
                return {
                    ...user,
                    open: user.id === payload ? !user.open : false
                }
            });
            state.currentPageUsers = updatedUsers;
        },
        setFilterValue(state, payload) {
            state.filterValue = payload;
        },
        setDataLoadingStatus(state, payload) {
            state.dataIsLoading = payload;
        },
    },
    actions: {
        async fetchPageData(context, pageNumber = 1) {
            const response = await fetch(`https://reqres.in/api/users?page=${pageNumber}`);
            const responseData = await response.json();

            if (!response.ok) {
                const error = new Error(responseData.message) || 'Failed to fetch users';
                throw error;
            }

            context.commit('setCurrentUsers', responseData.data);
            context.commit('setPagesQty', responseData['total_pages']);
        },
        setAccordionStatus(context, payload) {
            context.commit('setAccordionStatus', payload);
        },
        setFilterValue(context, payload) {
            context.commit('setFilterValue', payload);
        },
        setCurrentPageNumber(context, payload) {
            context.commit('setCurrentPageNumber', payload);
        },
        setDataLoadingStatus(context, payload) {
            context.commit('setDataLoadingStatus', payload);
        }
    },
    getters: {
        pageUsers: (state) => (searchValue) => {
            const unfilteredUserlist = state.currentPageUsers;
            if (searchValue) {
                return state.currentPageUsers.filter(user => {
                    const userFullname = user['first_name'] + user['last_name'];

                    return userFullname.toLowerCase().includes(searchValue.toLowerCase());
                })
            }
            return unfilteredUserlist;
        },
        pagesQty(state) {
            return state.pagesQty;
        },
        currentPageNumber(state) {
            return state.currentPageNumber;
        },
        hasUsers(state) {
            return state.currentPageUsers && state.currentPageUsers.length > 0;
        },
        filterValue(state) {
            return state.filterValue;
        },
        dataLoadingStatus(state) {
            return state.dataIsLoading;
        },
    }
});

export default store;